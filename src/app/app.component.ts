import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '微信读书笔记同步OneNote';
  loginDisplay = false;

  constructor(
  ) { }

  ngOnInit(): void {

  }

  loginRedirect() {
    const scope = environment.apiConfig.scopes.join("%20");
    const authUrl: string =
      `${environment.msalConfig.auth.authority}?client_id=${environment.msalConfig.auth.clientId}
    &redirect_uri=${chrome.identity.getRedirectURL("redirect")}
    &response_type=code&response_mode=query&scope=${scope}`;
    chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true },
      response => console.log(response))
  }

  logout() {
    // 删除token
  }

}
