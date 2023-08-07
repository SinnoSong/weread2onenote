import { Component, Input } from '@angular/core';
import { NoteBookTO } from 'src/model/notebook-detail-to';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input()
  bookItem?: NoteBookTO;
}
