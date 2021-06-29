import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const backend_url = "https://hw8-backend-310120.wl.r.appspot.com";


@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private httpClient: HttpClient) { }

  getAllTrendingTvs() {
    let url = backend_url + "/api/tvs/trendingTvs";
    return this.httpClient.get(url);
  }

  getAllTopRatedTvs() {
    let url = backend_url + "/api/tvs/topRatedTvs";
    return this.httpClient.get(url);
  }

  getAllPopularTvs() {
    let url = backend_url + "/api/tvs/popularTvs";
    return this.httpClient.get(url);
  }

  getTvDetails(id: string) {
    let url = backend_url + "/api/tvs/" + id;
    return this.httpClient.get(url);
  }

  getTvCast(id: string) {
    let url = backend_url + "/api/tvs/cast/" + id;
    return this.httpClient.get(url);
  }

  getTvReviews(id: string) {
    let url = backend_url + "/api/tvs/reviews/" + id;
    return this.httpClient.get(url);
  }

  getRecommendedTvs(id: string) {
    let url = backend_url + "/api/tvs/recommend/" + id;
    return this.httpClient.get(url);
  }

  getSimilarTvs(id: string) {
    let url = backend_url + "/api/tvs/similar/" + id;
    return this.httpClient.get(url);
  }

  getTvVideo(id: string) {
    let url = backend_url + "/api/tvs/video/" + id;
    return this.httpClient.get(url);
  }
}
