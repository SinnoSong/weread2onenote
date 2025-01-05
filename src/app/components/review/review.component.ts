import { Component, Input } from '@angular/core';
import { MarkTO } from 'src/model/weread/notebook-detail-to';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  imports: [CommonModule],
})
export class ReviewComponent {
  @Input()
  review?: MarkTO;
}
