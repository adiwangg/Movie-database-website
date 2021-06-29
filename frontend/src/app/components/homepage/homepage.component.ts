import { Component, OnInit, ViewChild } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { MovieService } from '../../services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/models/Result';
import { BreakpointState, LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private movieService: MovieService,
              private tvService: TvService,
              private storageService: StorageService,
              private _observer: BreakpointObserver) { }

  public nowPlayingMovies: any = [];

  public continueWatchings: any = [];
  public ncontinueWatchings: any = [[]];

  public trendingMovies: any = [];
  public topRatedMovies: any = [];
  public popularMovies: any = [];

  public npopularMovies: any = [[]];
  public ntrendingMovies: any = [[]];
  public ntopRatedMovies: any = [[]];

  public trendingTvs: any = [];
  public topRatedTvs: any = [];
  public popularTvs: any = [];
  public ntrendingTvs: any = [[]];
  public ntopRatedTvs: any = [[]];
  public npopularTvs: any = [[]];



  // region now playing movies
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  // endregion


  public isMobile: boolean = false;

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

    // fetch data
    this.fetchData();
  }

  fetchData() {
    // movies
    this.movieService.getAllTrendingMovies().subscribe((res) => {
      this.trendingMovies = res;
      this.ntrendingMovies = this.chunck(this.trendingMovies, 6);
    });

    this.movieService.getAllTopRatedMovies().subscribe((res) => {
      this.topRatedMovies = res;
      this.ntopRatedMovies = this.chunck(this.topRatedMovies, 6);
    });

    this.movieService.getAllPopularMovies().subscribe((res) => {
      this.popularMovies = res;
      this.npopularMovies = this.chunck(this.popularMovies, 6);
    });

    this.movieService.getAllNowPlayingMovies().subscribe((res) => {
      this.nowPlayingMovies = res;
    });

    // tvs
    this.tvService.getAllPopularTvs().subscribe((res) => {
      this.popularTvs = res;
      this.npopularTvs = this.chunck(this.popularTvs, 6);
    });

    this.tvService.getAllTopRatedTvs().subscribe((res) => {
      this.topRatedTvs = res;
      this.ntopRatedTvs = this.chunck(this.topRatedTvs, 6);
    });

    this.tvService.getAllTrendingTvs().subscribe((res) => {
      this.trendingTvs = res;
      this.ntrendingTvs = this.chunck(this.trendingTvs, 6);
    });

    // continue watching
    this.storageService.getContinueWatchings().subscribe((res) => {
      this.continueWatchings = res;
      this.ncontinueWatchings = this.chunck(this.continueWatchings, 6);
    })
  }



  chunck(arr:any[], chunckSize:any) {
    let res = [];
    for (var i = 0, len = arr.length; i < len; i += chunckSize) {
      res.push(arr.slice(i, i + chunckSize));
    }
    return res;
  }
}
