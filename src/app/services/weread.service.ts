import { HttpClient } from '@angular/common/http';
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

    getNoteBooks(): Observable<NotebooksPageVO> {
        const url = 'https://i.weread.qq.com/user/notebooks';
        return this.httpClient.get<NotebooksPageVO>(url);
    }

    getBookMarks(bookId: string): Observable<BookMarksResultVO> {
        const url = `https://i.weread.qq.com/book/bookmarklist?bookId=${bookId}`;
        return this.httpClient.get<BookMarksResultVO>(url);
    }

    getReviews(bookId: string): Observable<ReviewsResult> {
        const url = `https://i.weread.qq.com/review/list?bookId=${bookId}&listType=11&mine=1&synckey=0&listMode=0`;
        return this.httpClient.get<ReviewsResult>(url);
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
