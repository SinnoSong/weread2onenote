import { Component, OnInit } from '@angular/core';
import { NoteBookTO } from 'src/model/notebook-detail-to';
import { NotebooksPageVO } from 'src/model/notebook-vos';
import { WereadService } from 'src/service/weread-service';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css']
})
export class NotebooksComponent implements OnInit {
  notebooks?: NoteBookTO[];
  constructor(private wereadService: WereadService) { }
  ngOnInit(): void {
    this.getNoteBooks();
  }

  getNoteBooks() {
    this.wereadService.getNoteBooks().subscribe((data: NotebooksPageVO) => {
      this.notebooks = data.books.map(vo => {
        return {
          bookId: vo.bookId,
          name: vo.book.title,
          noteCount: vo.noteCount,
          reviewCount: vo.reviewCount
        } as NoteBookTO;
      })
    }
    );
  }
}
