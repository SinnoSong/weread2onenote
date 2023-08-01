import { Component, OnInit } from '@angular/core';
import { WereadService } from 'src/service/weread-service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  cookies!: [{ key: string, value: string }];
  constructor(private wereadService: WereadService) { }
  ngOnInit(): void {
    const cookieDict = this.wereadService.getCookies();
    Object.keys(cookieDict)
      .forEach(key => {
        this.cookies.push({ key: key, value: cookieDict[key] })
      });
  }
}
