import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Result } from '../models/Result';


@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private likes: any;
  private watches: any;

  constructor() {
  }

  // public addLikes(id: string, title: string, poster: string): void {
  //   let like = new Result(id, title, poster);
  //   let likes = this.getLikes();
  //   console.log(likes);
  //   console.log("!!00");
  //   likes.push(like);

  //   this.setLocalStorageLikes(likes);
  // }

  // public getLikes(): Result[] {
  //   let localStorageItem = JSON.parse(localStorage.getItem('likes') || '{}');
  //   //console.log(localStorageItem.length);
  //   return localStorageItem == null ? [] : localStorageItem.likes;
  // }

  // private setLocalStorageLikes(likes: Result[]): void {
  //   localStorage.setItem('likes', JSON.stringify({ likes: likes}));
  // }

  public getLikes(): Observable<Result[]> {
    if (localStorage.getItem('Likes') === null) {
      this.likes = [];
    } else {
      this.likes = JSON.parse(localStorage.getItem('Likes') || '{}');
    }

    return of(this.likes);
  }

  public addLikes(result: Result) {

  }


  public getContinueWatchings(): Observable<Result[]>{
    if (localStorage.getItem('Watches') === null) {
      this.watches = [];
    } else {
      this.watches = JSON.parse(localStorage.getItem('Watches') || '{}');
    }

    return of(this.watches);
  }

}
