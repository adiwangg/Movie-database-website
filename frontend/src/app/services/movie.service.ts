import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const backend_url =  "https://hw8-backend-310120.wl.r.appspot.com";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAllNowPlayingMovies() {
    let url = backend_url + "/api/movies/nowplayingMovies";
    return this.httpClient.get(url);
  }

  getAllTrendingMovies() {
    let url = backend_url + "/api/movies/trendingMovies";
    return this.httpClient.get(url);
  }

  getAllTopRatedMovies() {
    let url = backend_url + "/api/movies/topRatedMovies";
    return this.httpClient.get(url);
  }

  getAllPopularMovies() {
    let url = backend_url + "/api/movies/popularMovies";
    return this.httpClient.get(url);
  }

  getMovieDetails(id: string) {
    let url = backend_url + "/api/movies/" + id;
    return this.httpClient.get(url);
  }

  getMovieCast(id: string) {
    let url = backend_url + "/api/movies/cast/" + id;
    return this.httpClient.get(url);
  }

  getMovieReviews(id: string) {
    let url = backend_url + "/api/movies/reviews/" + id;
    return this.httpClient.get(url);
  }

  getRecommendedMovies(id: string) {
    let url = backend_url + "/api/movies/recommend/" + id;
    return this.httpClient.get(url);
  }

  getSimilarMovies(id: string) {
    let url = backend_url + "/api/movies/similar/" + id;
    return this.httpClient.get(url);
  }

  getMovieVideo(id: string) {
    let url = backend_url + "/api/movies/video/" + id;
    return this.httpClient.get(url);
  }

}
