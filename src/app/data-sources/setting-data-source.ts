import { Injectable } from "@angular/core";
import { SettingTreeNode } from "src/model/onenote/setting-tree-node";
import { OnenoteService } from "../services/onenote.service";
import { LocalStorageService } from "ngx-webstorage";
import { MsalToken } from "src/model/onenote/msal-token";
import { Observable, map } from "rxjs";


@Injectable({ providedIn: "root" })
export class SettingDataBase {
    constructor(
        private onenoteService: OnenoteService,
        private storageService: LocalStorageService
    ) { }

    initialData(): Observable<SettingTreeNode[]> {
        const msalToken: MsalToken = this.storageService.retrieve("msalToken");
        return this.onenoteService.getNoteBooks(msalToken.access_token).pipe(map((booksResult) => {
            return booksResult.value.map((vo) => {
                return {
                    name: vo.displayName,
                    id: vo.id,
                    level: 0,
                    expandable: true
                } as SettingTreeNode;
            });
        }));
    }

    getSection(noteBookId: string): Observable<SettingTreeNode[]> {
        const msalToken: MsalToken = this.storageService.retrieve("msalToken");
        return this.onenoteService.getSections(noteBookId, msalToken.access_token).pipe(map((sectionsResult) => {
            return sectionsResult.value.map((vo) => {
                return {
                    name: vo.displayName,
                    id: vo.id,
                    level: 1,
                    isSection: true
                } as SettingTreeNode;
            });
        }));
    }
}