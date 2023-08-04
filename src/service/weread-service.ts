import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WereadService {
    constructor() {
    }

    getReview() {
        const cookies = this.getCookies();

    }

    private getCookies(): chrome.cookies.Cookie[] {
        const cookieList: chrome.cookies.Cookie[] = [];
        chrome.cookies.getAll({ url: "https://weread.qq.com" }, (cookies) => {
            cookies.forEach((c) => cookieList.push(c));
        });
        return cookieList;
    }
}
