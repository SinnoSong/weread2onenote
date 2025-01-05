import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { MsalToken } from 'src/model/onenote/msal-token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { BooksComponent } from 'src/app/components/books/books.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatToolbarModule, CommonModule, BooksComponent],
})
export class HomeComponent implements OnInit {
  title = '微信读书笔记同步OneNote';
  loginDisplay = false;

  constructor(
    private httpClient: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const msalToken: MsalToken = this.storage.retrieve('msalToken');
    this.loginDisplay =
      msalToken !== null && msalToken.expires_in > new Date().getTime();
  }

  async loginRedirect() {
    const scope = environment.apiConfig.scopes.join('%20');
    const redirectURl = chrome.identity.getRedirectURL('redirect');
    const codeVerifier = await this.encode(
      crypto.getRandomValues(new Uint8Array(32))
    );
    const codeChallenge = await this.pkceChallengeFromVerifier(codeVerifier);
    const authUrl: string = `${environment.msalConfig.auth.authority}/oauth2/v2.0/authorize?client_id=${environment.msalConfig.auth.clientId}
    &redirect_uri=${redirectURl}&response_type=code&response_mode=query&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      (response: string | undefined) => {
        if (response == undefined) {
          alert('登录失败,请重试！');
        } else {
          const tokenUrl = `${environment.msalConfig.auth.authority}/oauth2/v2.0/token`;
          const headers = new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          );
          console.log(response);
          const code = new URL(response).searchParams.get('code');
          const body = this.generateFormUrlEncoded({
            client_id: environment.msalConfig.auth.clientId,
            scope: environment.apiConfig.scopes.join(' '),
            redirect_uri: redirectURl,
            grant_type: 'authorization_code',
            code: code,
            code_verifier: codeVerifier,
          });
          this.httpClient
            .post<MsalToken>(tokenUrl, body, { headers })
            .subscribe((result) => {
              result.expires_in =
                new Date().getTime() + result.expires_in * 1000 - 2000;
              result.ext_expires_in =
                new Date().getTime() + result.expires_in * 1000 - 2000;
              this.storage.store('msalToken', result);
            });
        }
      }
    );
    this.loginDisplay = !this.loginDisplay;
    alert('登录成功！');
  }

  logout() {
    this.storage.clear();
    this.loginDisplay = !this.loginDisplay;
  }

  settings() {
    if (!this.loginDisplay) {
      alert('请先登录！');
    } else {
      this.router.navigateByUrl('settings');
    }
  }

  private generateFormUrlEncoded(data: any): string {
    let urlSearchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        urlSearchParams.append(key, data[key]);
      }
    }
    return urlSearchParams.toString();
  }

  private async hashSHA256(str: string): Promise<ArrayBuffer> {
    const utf8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    return hashBuffer;
  }

  async base64_arraybuffer(data: ArrayBuffer): Promise<string> {
    // Use a FileReader to generate a base64 data URI
    const base64url: string = await new Promise((r) => {
      const reader = new FileReader();
      reader.onload = () => r(reader.result as string);
      reader.readAsDataURL(new Blob([data]));
    });

    /*
    The result looks like
    "data:application/octet-stream;base64,<your base64 data>",
    so we split off the beginning:
    */
    return base64url.split(',', 2)[1];
  }

  private async encode(input: ArrayBuffer): Promise<string> {
    return (await this.base64_arraybuffer(input))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async pkceChallengeFromVerifier(v: string) {
    let hash = await this.hashSHA256(v);
    let challenge = this.encode(hash);
    return challenge;
  }
}
