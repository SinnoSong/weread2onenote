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

  loginRedirect() {
    const scope = environment.apiConfig.scopes.join("%20");
    const redirectURl = chrome.identity.getRedirectURL("redirect");
    const authUrl: string =
      `${environment.msalConfig.auth.authority}/oauth2/v2.0/authorize?client_id=${environment.msalConfig.auth.clientId}
    &redirect_uri=${redirectURl}&response_type=code&response_mode=query&scope=${scope}`;
    chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true },
      (response: string | undefined) => {
        // todo badrequest ,need fix
        const tokenUrl = `${environment.msalConfig.auth.authority}/oauth2/v2.0/token`;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        // code is null
        const code = new URLSearchParams(response).get("code");
        const body = this.generateFormUrlEncoded({
          client_id: environment.msalConfig.auth.clientId,
          scope: environment.apiConfig.scopes.join(" "),
          redirect_uri: redirectURl,
          grant_type: "authorization_code",
          //https://eibpbaimgiabjlckabimpoaablbmnlne.chromiumapp.org/redirect?code=M.C107_BAY.2.aa00d23c-66df-0098-5892-e2b82b075c9a
          code: code
        });
        this.httpClient.post(tokenUrl, body, { headers }).subscribe((result) =>
          console.log(result)
        );
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
}
