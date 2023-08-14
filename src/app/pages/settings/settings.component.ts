import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';
import { LocalStorageService } from "ngx-webstorage";
import { MsalToken } from 'src/model/onenote/msal-token';
import { OnenoteService } from 'src/app/services/onenote.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  treeControl = new NestedTreeControl<SettingTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SettingTreeNode>();

  constructor(
    private onenoteService: OnenoteService,
    private storageService: LocalStorageService
  ) {
  }
  // todo 修改css为行内
  ngOnInit(): void {
    // 获取全部数据组装节点
    this.getNoteBooks().subscribe(notebooks => {
      notebooks.forEach(notebook => this.getSections(notebook.id).subscribe(sections => notebook.children = sections));
      console.log(notebooks);
      this.dataSource.data = notebooks;
    });
  }


  private getNoteBooks(): Observable<SettingTreeNode[]> {
    const msalToken: MsalToken = this.storageService.retrieve("msalToken");
    return this.onenoteService.getNoteBooks(msalToken.access_token).pipe(map(booksResult => {
      return booksResult.value.map((vo) => {
        return {
          name: vo.displayName,
          id: vo.id
        } as SettingTreeNode;
      });
    }));
  }

  private getSections(noteBookId: string): Observable<SettingTreeNode[]> {
    const msalToken: MsalToken = this.storageService.retrieve("msalToken");
    return this.onenoteService.getSections(noteBookId, msalToken.access_token).pipe(map(sectionsResult => {
      return sectionsResult.value.map((vo) => {
        return {
          name: vo.displayName,
          id: vo.id
        } as SettingTreeNode;
      });
    }));
  }

  hasChild = (_: number, _nodeData: SettingTreeNode) => !!_nodeData.children && _nodeData.children.length > 0;
}
