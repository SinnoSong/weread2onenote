import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { OnenoteService } from 'src/app/services/onenote.service';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';
import { MarkTO } from 'src/model/weread/notebook-detail-to';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input()
  review?: MarkTO;
  ngOnInit(): void {

  }
  constructor(private onenoteService: OnenoteService,
    private storageService: LocalStorageService
  ) { }

  syncToOnenote() {
    // todo 将内容同步到onenote
    // 标题固定为 微信读书笔记--{title}
    // 查询是否已经存在相同标题的笔记，如果存在对比内容是否包含本review的内容，如果包含则不同步，如果不包含则同步
    const syncNode: SettingTreeNode = this.storageService.retrieve("syncNode");
    this.onenoteService.getPages(syncNode.id, this.storageService.retrieve("msalToken").access_token).subscribe();
  }
}
