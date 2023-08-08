import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookMarksResultVO } from 'src/model/weread/bookmark-vos';
import { NotebooksPageVO } from 'src/model/weread/notebook-vos';
import { ReviewsResult } from 'src/model/weread/review-vos';


@Injectable({
    providedIn: 'root',
})
export class WereadService {
    constructor(private httpClient: HttpClient) {
    }
    private header = new HttpHeaders({
        'accept': "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5"
    });

    getNoteBooks(): Observable<NotebooksPageVO> {
        const url = 'https://i.weread.qq.com/user/notebooks';
        return this.httpClient.get<NotebooksPageVO>(url, { headers: this.header, withCredentials: true });
    }

    getBookMarks(bookId: string): Observable<BookMarksResultVO> {
        const url = `https://i.weread.qq.com/book/bookmarklist?bookId=${bookId}`;
        return this.httpClient.get<BookMarksResultVO>(url, { headers: this.header, withCredentials: true });
    }

    getReviews(bookId: string): Observable<ReviewsResult> {
        const url = `https://i.weread.qq.com/review/list?bookId=${bookId}&listType=11&mine=1&synckey=0&listMode=0`;
        return this.httpClient.get<ReviewsResult>(url, { headers: this.header, withCredentials: true });
    }

    // 暂时不需要
    // private getCookies(): chrome.cookies.Cookie[] {
    //     const cookieList: chrome.cookies.Cookie[] = [];
    //     chrome.cookies.getAll({ url: "https://weread.qq.com" }, (cookies) => {
    //         cookies.forEach((c) => cookieList.push(c));
    //     });
    //     return cookieList;
    // }
}
