import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, OperatorFunction } from 'rxjs'
import { switchMap, map, debounceTime, catchError, distinctUntilChanged, tap } from 'rxjs/operators'

const backend_url = "https://hw8-backend-310120.wl.r.appspot.com";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getAllSearchResults() {
    let url = backend_url + "/api/posts";
    return this.httpClient.get(url);
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.httpClient
      .get<{"results": {id:number,name:string,backdrop_path:string}[]}>(backend_url + "/api/search/" + term).pipe(
        map(response => response.results.slice(0, 7))
      );
  }
}
