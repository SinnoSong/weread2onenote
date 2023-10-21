import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { OnenoteService } from 'src/app/services/onenote.service';
import { WereadService } from 'src/app/services/weread.service';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';
import { MarkTO, NoteBookTO } from 'src/model/weread/notebook-detail-to';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input()
  bookItem?: NoteBookTO;

  constructor(private onenoteService: OnenoteService,
    private wereadService: WereadService,
    private storageService: LocalStorageService
  ) { }

  syncToOneNote() {
    // get marks and reviews
    if (this.bookItem == undefined) {
      return;
    }
    const marks: MarkTO[] = [];
    this.wereadService.getBookMarks(this.bookItem.bookId).subscribe(data => data.updated.map(vo => {
      return {
        chapterName: vo.chapterName,
        abstract: vo.markText
      } as MarkTO;
    }).forEach(dto => marks.push(dto)));
    this.wereadService.getReviews(this.bookItem.bookId).subscribe(data => {
      data.reviews.map(vo => {
        return {
          chapterName: vo.review.chapterName,
          abstract: vo.review.abstract,
          content: vo.review.content
        } as MarkTO;
      }).forEach(dto => marks.push(dto));
    });
    // todo 查找是否包含相同标题的笔记，如果包含现有全部内容则不同步，如果不包含则同步
    const syncNode: SettingTreeNode = this.storageService.retrieve("syncNode");
    this.onenoteService.getPages(syncNode.id, this.storageService.retrieve("msalToken").access_token).subscribe();
  }
}
