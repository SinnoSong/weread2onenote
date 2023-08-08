import { Component, Input, OnInit } from '@angular/core';
import { OnenoteService } from 'src/app/services/onenote.service';
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
  constructor(private onenoteService: OnenoteService) { }

  syncToOnenote() {

  }
}
