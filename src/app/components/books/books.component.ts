import { Component, OnInit } from '@angular/core';
import { NoteBookTO } from 'src/model/weread/notebook-detail-to';
import { NotebooksPageVO } from 'src/model/weread/notebook-vos';
import { WereadService } from 'src/app/services/weread.service';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from 'src/app/components/book-item/book-item.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  imports: [CommonModule, BookItemComponent],
})
export class BooksComponent implements OnInit {
  notebooks?: NoteBookTO[];
  constructor(private wereadService: WereadService) {}
  ngOnInit(): void {
    this.getNoteBooks();
  }

  getNoteBooks() {
    this.wereadService.getNoteBooks().subscribe((data: NotebooksPageVO) => {
      this.notebooks = data.books.map((vo) => {
        return {
          bookId: vo.bookId,
          name: vo.book.title,
          noteCount: vo.noteCount,
          reviewCount: vo.reviewCount,
        } as NoteBookTO;
      });
    });
  }
}
