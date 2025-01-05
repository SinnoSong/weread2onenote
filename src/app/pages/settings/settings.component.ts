import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';
import { LocalStorageService } from "ngx-webstorage";
import { OnenoteService } from 'src/app/services/onenote.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: false
})
export class SettingsComponent implements OnInit {
  treeControl = new NestedTreeControl<SettingTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SettingTreeNode>();
  notebooks: SettingTreeNode[] = [];
  selectedNode: SettingTreeNode | undefined;

  constructor(
    private onenoteService: OnenoteService,
    private storageService: LocalStorageService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getNoteBooks().pipe(
      switchMap(notebooks => {
        this.notebooks = notebooks;
        const sectionObservables = notebooks.map(notebook => this.getSections(notebook.id));
        return forkJoin(sectionObservables);
      })
    ).subscribe(sections => {
      this.notebooks.forEach((notebook, index) => {
        notebook.children = sections[index];
      });
      this.dataSource.data = this.notebooks;
    });
    console.log(this.dataSource.data);
  }
  // todo 修改样式问题


  private getNoteBooks(): Observable<SettingTreeNode[]> {
    return this.onenoteService.getNoteBooks().pipe(map(booksResult => {
      return booksResult.value.map((vo) => {
        return {
          name: vo.displayName,
          id: vo.id
        } as SettingTreeNode;
      });
    }));
  }

  private getSections(noteBookId: string): Observable<SettingTreeNode[]> {
    return this.onenoteService.getSections(noteBookId).pipe(map(sectionsResult => {
      return sectionsResult.value.map((vo) => {
        return {
          name: vo.displayName,
          id: vo.id
        } as SettingTreeNode;
      });
    }));
  }

  confirm() {
    if (this.selectedNode == undefined) {
      alert("请选择笔记本");
    }
    else {
      this.storageService.store("syncNode", this.selectedNode);
      alert("设置成功！");
      this.router.navigateByUrl("");
    }
  }
  selectSection(node: SettingTreeNode) {
    this.selectedNode = node;
  }

  hasChild = (_: number, _nodeData: SettingTreeNode) => _nodeData.children && _nodeData.children.length > 0;
}
