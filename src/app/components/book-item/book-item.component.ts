import { Component, Input } from '@angular/core';
import { OnenoteService } from 'src/app/services/onenote.service';
import { WereadService } from 'src/app/services/weread.service';
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
    private wereadService: WereadService
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
    // todo 选择sectionId
  }
}
