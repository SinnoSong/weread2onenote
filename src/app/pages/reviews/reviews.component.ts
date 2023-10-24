import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookMarksResultVO } from 'src/model/weread/bookmark-vos';
import { MarkTO } from 'src/model/weread/notebook-detail-to';
import { ReviewsResult } from 'src/model/weread/review-vos';
import { WereadService } from 'src/app/services/weread.service';
import { OnenoteService } from 'src/app/services/onenote.service';
import { LocalStorageService } from 'ngx-webstorage';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';
import { MsalToken } from 'src/model/onenote/msal-token';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: MarkTO[] = [];
  bookTitle?: string;
  constructor(
    private wereadService: WereadService,
    private route: ActivatedRoute,
    private onenoteService: OnenoteService,
    private storageService: LocalStorageService) { }
  ngOnInit(): void {
    const bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.getBookMarks(bookId);
    this.getBookReviews(bookId);
    console.log(this.reviews);
  }

  syncToOnenote() {
    const msalToken: MsalToken = this.storageService.retrieve("msalToken");
    if (msalToken === null) {
      alert("请先登录!");
      return;
    }
    const syncNode: SettingTreeNode = this.storageService.retrieve("syncNode");
    if (syncNode === null) {
      alert("请选择要同步的笔记本!");
      return;
    }
    this.onenoteService.getPages(syncNode.id, msalToken.access_token)
      .subscribe(pagesResult => {
        const values = pagesResult.value.filter(vo => vo.title === `微信读书笔记--${this.bookTitle}`);
        if (values.length > 0) {
          //存在相同标题的笔记,对比这个页面的内容是否包含reviews的内容
          const pageId = values[0].id;
          this.onenoteService.getPageContent(pageId, msalToken.access_token).subscribe(pageContent => {
            if (!this.reviews.every(review => pageContent.includes(review.content))) {
              // 调用更新pageContent
              const others = this.reviews.filter(review => !pageContent.includes(review.content));
              this.onenoteService.updatePageContent(pageId, msalToken.access_token, others).subscribe(response =>
                response.status == 204 ? alert("更新成功") : alert("更新失败"));
            }
          });
        } else {
          //创建新page将全部reviews写入到page中
          this.onenoteService.createPage(syncNode.id, msalToken.access_token, this.bookTitle!, this.reviews).subscribe();
        }
      });
  }

  getBookMarks(bookId: string) {
    this.wereadService.getBookMarks(bookId).subscribe((data: BookMarksResultVO) => {
      this.bookTitle = data.book.title;
      data.updated.map(vo => {
        return {
          chapterName: vo.chapterName,
          abstract: vo.markText
        } as MarkTO;
      }).forEach(dto => this.reviews.push(dto))
    });
  }

  getBookReviews(bookId: string) {
    this.wereadService.getReviews(bookId).subscribe((data: ReviewsResult) =>
      data.reviews.map(vo => {
        return {
          chapterName: vo.review.chapterTitle,
          abstract: vo.review.abstract,
          content: vo.review.content
        } as MarkTO;
      }).forEach(dto => this.reviews.push(dto))
    );
  }

}
