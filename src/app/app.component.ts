import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MsalToken } from 'src/model/msal-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '微信读书笔记同步OneNote';
  loginDisplay = false;

  constructor(private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  async loginRedirect() {
    const scope = environment.apiConfig.scopes.join("%20");
    const redirectURl = chrome.identity.getRedirectURL("redirect");
    const codeVerifier = await this.encode(crypto.getRandomValues(new Uint8Array(32)));
    const codeChallenge = await this.pkceChallengeFromVerifier(codeVerifier);
    const authUrl: string =
      `${environment.msalConfig.auth.authority}/oauth2/v2.0/authorize?client_id=${environment.msalConfig.auth.clientId}
    &redirect_uri=${redirectURl}&response_type=code&response_mode=query&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true },
      (response: string | undefined) => {
        if (response == undefined) {
          console.log("login failed")
        } else {
          const tokenUrl = `${environment.msalConfig.auth.authority}/oauth2/v2.0/token`;
          const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
          console.log(response);
          const code = new URL(response).searchParams.get("code");
          const body = this.generateFormUrlEncoded({
            client_id: environment.msalConfig.auth.clientId,
            scope: environment.apiConfig.scopes.join(" "),
            redirect_uri: redirectURl,
            grant_type: "authorization_code",
            //https://eibpbaimgiabjlckabimpoaablbmnlne.chromiumapp.org/redirect?code=M.C107_BAY.2.aa00d23c-66df-0098-5892-e2b82b075c9a
            code: code,
            code_verifier: codeVerifier
          });
          console.log(body);
          this.httpClient.post(tokenUrl, body, { headers }).subscribe((result) =>
            console.log(result)
          );
        }
      });
  }


  logout() {
    // 删除token
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
      const reader = new FileReader()
      reader.onload = () => r(reader.result as string)
      reader.readAsDataURL(new Blob([data]))
    })

    /*
    The result looks like
    "data:application/octet-stream;base64,<your base64 data>",
    so we split off the beginning:
    */
    return base64url.split(",", 2)[1]
  }


  private async encode(input: ArrayBuffer): Promise<string> {
    return (await this.base64_arraybuffer(input)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  private async pkceChallengeFromVerifier(v: string) {
    let hash = await this.hashSHA256(v)
    let challenge = this.encode(hash)
    return challenge
  }

}