import { Component, Input } from '@angular/core';
import { MarkTO } from 'src/model/weread/notebook-detail-to';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  @Input()
  review?: MarkTO;
}
