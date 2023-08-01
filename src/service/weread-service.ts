import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class WereadService {
    constructor(private _cookieService: CookieService) {
    }

    getCookies() {
        return this._cookieService.getAll();
    }
}
