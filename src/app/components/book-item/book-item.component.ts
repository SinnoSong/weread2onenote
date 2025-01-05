import { Component, Input } from '@angular/core';
import { NoteBookTO } from 'src/model/weread/notebook-detail-to';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
  imports: [RouterModule],
})
export class BookItemComponent {
  @Input()
  bookItem?: NoteBookTO;

  constructor() {}
}
