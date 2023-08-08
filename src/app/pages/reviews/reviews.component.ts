import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookMarksResultVO } from 'src/model/weread/bookmark-vos';
import { MarkTO } from 'src/model/weread/notebook-detail-to';
import { ReviewsResult } from 'src/model/weread/review-vos';
import { WereadService } from 'src/app/services/weread.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: MarkTO[] = [];
  constructor(
    private wereadService: WereadService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    const bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.getBookMarks(bookId);
    this.getBookReviews(bookId);
  }

  getBookMarks(bookId: string) {
    this.wereadService.getBookMarks(bookId).subscribe((data: BookMarksResultVO) =>
      data.updated.map(vo => {
        return {
          chapterName: vo.chapterName,
          abstract: vo.markText
        } as MarkTO;
      }).forEach(dto => this.reviews.push(dto))
    );
  }

  getBookReviews(bookId: string) {
    this.wereadService.getReviews(bookId).subscribe((data: ReviewsResult) =>
      data.reviews.map(vo => {
        return {
          chapterName: vo.review.chapterName,
          abstract: vo.review.abstract,
          content: vo.review.content
        } as MarkTO;
      })
    );
  }

}
