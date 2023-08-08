import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { NotebooksComponent } from './components/notebooks/notebooks.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { ReviewComponent } from './components/review/review.component';
import { NgxWebstorageModule } from "ngx-webstorage";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReviewsComponent,
    NotebooksComponent,
    BookItemComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule, // Animations cause delay which interfere with E2E tests
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
