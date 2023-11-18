import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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

  getNoteBooks(): Observable<OneNoteNoteBooksResult> {
    const url = `${environment.apiConfig.uri}/onenote/notebooks`;
    return this.httpClient.get<OneNoteNoteBooksResult>(url);
  }

  getSections(noteBookId: string): Observable<OneNoteSectionsResult> {
    const url = `${environment.apiConfig.uri}/onenote/notebooks/${noteBookId}/sections`;
    return this.httpClient.get<OneNoteSectionsResult>(url);
  }

  createPage(sectionId: string, bookName: string, marks: MarkTO[]) {
    const header = new HttpHeaders({
      "Content-Type": "text/html",
    });
    const url = `${environment.apiConfig.uri}/onenote/sections/${sectionId}/pages`;
    const content = marks.map(mark => {
      let section = `<p style="font-family: Calibri; margin-top: 6pt; margin-bottom: 6pt">`;
      if (mark.abstract !== undefined) {
        section += `<span style="font-family: Microsoft YaHei UI; font-size: 14pt">${mark.abstract}</span>
        <br />`;
      }
      if (mark.content !== undefined) {
        section += `<span style="font-family: Microsoft YaHei UI; font-size: 12pt">${mark.content}</span>
        <br />`;
      }
      if (mark.chapterName !== undefined) {
        section += `<span style="font-family: Microsoft YaHei UI; font-size: 10pt >${mark.chapterName}</span>  
        </p>`;
      }
      return section;
    }).join("<br /><br />");;
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

  getPages(sectionId: string): Observable<OneNotePagesResult> {
    const url = `${environment.apiConfig.uri}/onenote/sections/${sectionId}/pages`;
    return this.httpClient.get<OneNotePagesResult>(url);
  }

  getPageContent(pageId: string): Observable<string> {
    const url = `${environment.apiConfig.uri}/onenote/pages/${pageId}/content`;
    return this.httpClient.get<string>(url);
  }

  updatePageContent(pageId: string, marks: MarkTO[]) {
    const url = `${environment.apiConfig.uri}/onenote/pages/${pageId}/content`;
    const updateContents = marks.flatMap(mark => {
      let content = `<p style="font-family: Calibri; margin-top: 6pt; margin-bottom: 6pt">`;
      if (mark.abstract !== undefined) {
        content += `<span style="font-family: Microsoft YaHei UI; font-size: 14pt">${mark.abstract}</span>
        <br />`;
      }
      if (mark.content !== undefined) {
        content += `<span style="font-family: Microsoft YaHei UI; font-size: 12pt">${mark.content}</span>
        <br />`;
      }
      if (mark.chapterName !== undefined) {
        content += `<span style="font-family: Microsoft YaHei UI; font-size: 10pt >${mark.chapterName}</span>  
        </p>`;
      }
      return {
        target: "body",
        action: "append",
        content: content
      };
    });
    return this.httpClient.patch<HttpResponse<any>>(url, updateContents);
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
