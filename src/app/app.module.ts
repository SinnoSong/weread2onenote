import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { BooksComponent } from './components/books/books.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { ReviewComponent } from './components/review/review.component';
import { NgxWebstorageModule } from "ngx-webstorage";
import { SettingsComponent } from './pages/settings/settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReviewsComponent,
    BooksComponent,
    BookItemComponent,
    ReviewComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    MatCardModule,
    MatTreeModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
