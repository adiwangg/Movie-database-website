import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const backend_url =  "https://hw8-backend-310120.wl.r.appspot.com";

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private httpClient: HttpClient) { }

  getCastDetails(id: string) {
    let url = backend_url + "/api/casts/" + id;
    return this.httpClient.get(url);
  }

  getCastSocialDetails(id: string) {
    let url = backend_url + "/api/casts/social/" + id;
    return this.httpClient.get(url);
  }
}
