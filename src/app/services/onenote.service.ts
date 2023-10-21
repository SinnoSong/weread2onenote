import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MsalToken } from 'src/model/onenote/msal-token';
import { OneNoteSectionsResult } from 'src/model/onenote/note-sections';
import { OneNoteNoteBooksResult } from 'src/model/onenote/notebooks';
import { OneNotePagesResult } from 'src/model/onenote/pages';
import { MarkTO } from 'src/model/weread/notebook-detail-to';

@Injectable({
  providedIn: 'root'
})
export class OnenoteService {

  constructor(private httpClient: HttpClient) { }

  getNoteBooks(token: string): Observable<OneNoteNoteBooksResult> {
    const header = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
    });
    const url = `${environment.apiConfig.uri}/onenote/notebooks`;
    return this.httpClient.get<OneNoteNoteBooksResult>(url, { headers: header });
  }

  getSections(noteBookId: string, token: string): Observable<OneNoteSectionsResult> {
    const header = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
    });
    const url = `${environment.apiConfig.uri}/onenote/notebooks/${noteBookId}/sections`;
    return this.httpClient.get<OneNoteSectionsResult>(url, { headers: header });
  }

  // todo 添加更新指定page

  createPage(sectionId: string, token: string, bookName: string, marks: MarkTO[]) {
    const header = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "text/html",
    });
    const url = `${environment.apiConfig.uri}/onenote/sections/${sectionId}/pages`;
    const content = marks.map(mark =>
      `<p style="font-family: Calibri; margin-top: 6pt; margin-bottom: 6pt">
        <span style="font-family: Microsoft YaHei UI; font-size: 14pt">${mark.abstract}</span>
        <span style="font-family: Microsoft YaHei UI; font-size: 12pt">${mark.content}</span>
        <span style="font-family: Microsoft YaHei UI; >${mark.chapterName}</span>
      </p>`).join("<br />");;
    const body =
      `<html lang="zh-CN">
        <head>
        <title>微信读书笔记--${bookName}</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="created" content="${new Date()}" />
        </head>
        <body data-absolute-enabled="true" style="font-family: Microsoft YaHei; font-size: 11pt">
          ${content}
        </body>
      </html>`;
    return this.httpClient.post(url, body, { headers: header });
  }

  getPages(sectionId: string, token: string): Observable<OneNotePagesResult> {
    const header = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
    });
    const url = `${environment.apiConfig.uri}/onenote/sections/${sectionId}/pages`;
    return this.httpClient.get<OneNotePagesResult>(url, { headers: header });
  }

  getPageContent(pageId: string, token: string): Observable<string> {
    const header = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
    });
    const url = `${environment.apiConfig.uri}/onenote/pages/${pageId}/content`;
    return this.httpClient.get<string>(url, { headers: header });
  }

  refreshToken(refreshToken: string): Observable<MsalToken> {
    const url = `${environment.msalConfig.auth.authority}/oauth2/v2.0/token`;
    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    const body = new HttpParams().set('grant_type', 'refresh_token').set('refresh_token', refreshToken)
      .set('client_id', environment.msalConfig.auth.clientId).set('scope', environment.apiConfig.scopes.join(' '));
    return this.httpClient.post<MsalToken>(url, body, { headers: header });
  }
}
