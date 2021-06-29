import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
})
export class MylistComponent implements OnInit {
  public likes: any = [];

  public isMobile: boolean = false;

  constructor(
    private storageService: StorageService,
    private _observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // check desktop or mobile
    const isMatch = this._observer.observe('(max-width: 600px)').subscribe((result) => {
      console.log(result);
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.fetchData();
  }

  private fetchData(): void {
    this.storageService.getLikes().subscribe((res) => {
      this.likes = res;
      for (var i = 0; i < this.likes.length; i++) {
        this.likes[i]['id'] = this.likes[i]['id'].split(':')[1];
      }
    });
  }
}
