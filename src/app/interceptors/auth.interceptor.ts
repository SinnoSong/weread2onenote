import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { MsalToken } from 'src/model/onenote/msal-token';
import { OnenoteService } from '../services/onenote.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: LocalStorageService,
    private onenoteService: OnenoteService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.apiConfig.uri)) {
      // onenote 添加token和刷新token
      let msalToken: MsalToken = this.storageService.retrieve("msalToken");
      if (msalToken) {
        if (msalToken.expires_in > (new Date().getTime() + 30000)) {
          this.onenoteService.refreshToken(msalToken.refresh_token).subscribe(
            newMsalToken => {
              this.storageService.store("msalToken", newMsalToken);
              msalToken = newMsalToken;
            })
        }

        const headers = req.headers
          .set('Authorization', `Bearer ${msalToken.access_token}`);
        const onenoteReq = req.clone({ headers });
        return next.handle(onenoteReq);
      }
    } else if (req.url.includes("i.weread.qq.com")) {
      const headers = req.headers.set("accept-language", "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5");
      const wereadReq = req.clone({
        headers: headers,
        withCredentials: true
      })
      return next.handle(wereadReq);
    }
    return next.handle(req);
  }
}
