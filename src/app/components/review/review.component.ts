import { Component, Input, OnInit } from '@angular/core';
import { MarkTO } from 'src/model/notebook-detail-to';

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


}
