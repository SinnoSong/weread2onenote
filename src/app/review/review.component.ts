import { Component, OnInit } from '@angular/core';
import { BookMarksResultVO } from 'src/model/bookmark-vos';
import { NotebooksPageVO } from 'src/model/notebook-vos';
import { ReviewsResult } from 'src/model/review-vos';
import { WereadService } from 'src/service/weread-service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  // todo 测试bookId
  bookId: string = "41516087";
  constructor(private wereadService: WereadService) { }
  ngOnInit(): void {

  }

  getNoteBooks() {
    this.wereadService.getNoteBooks().subscribe((data: NotebooksPageVO) => console.log(JSON.stringify(data)));
  }

  getBookMarks() {
    this.wereadService.getBookMarks(this.bookId).subscribe((data: BookMarksResultVO) => console.log(JSON.stringify(data)));
  }

  getBookReviews() {
    this.wereadService.getReviews(this.bookId).subscribe((data: ReviewsResult) => console.log(JSON.stringify(data)));
  }
}
