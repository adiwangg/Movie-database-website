import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/Result';
import { TvService } from 'src/app/services/tv.service';
import { CastService } from 'src/app/services/cast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tv-details.component.css'],
})
export class TvDetailsComponent implements OnInit {
  public id: any;
  public tv: any = {};
  public cast: any = [];
  public reviews: any = [];
  public recommended: any = [];
  public similars: any = [];
  public video: any = {};
  public youtubeSrc: any = {};

  public twitter_url: any = {};
  public facebook_url: any = {};

  public recommended_2d: any = [[]];
  public similars_2d: any = [[]];

  public watches: any = {};
  public likes: any = {};
  public addedToLikes: Boolean = false;

  // region for alert
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  successMessage = '';
  dangerMessage = '';

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  // endregion

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService,
    private castService: CastService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private _observer: BreakpointObserver
  ) {}

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

    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchData();

    this.updateLikes();
    for (var i = 0; i < this.likes.length; i++) {
      if ('t:' + this.id === this.likes[i].id) {
        this.addedToLikes = true;
      }
    }

    //alert
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._danger.subscribe((message) => (this.dangerMessage = message));
    this._danger.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  fetchData() {
    this.tvService.getTvDetails(this.id).subscribe((res) => {
      this.tv = res;
      this.addWatchList();

      this.tvService.getTvVideo(this.id).subscribe((res) => {
        this.video = res;

        this.twitter_url =
          'http://twitter.com/share?' +
          'text=' +
          encodeURIComponent(this.tv.title) +
          '&url=https://www.youtube.com/watch?v=' +
          this.video +
          '&hashtags=USC,CSCI571,FightOn';
        this.facebook_url =
          'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' +
          this.video +
          '&amp;src=sdkpreparse';
      });
    });

    this.tvService.getTvCast(this.id).subscribe((res) => {
      this.cast = res;
      this.cast = this.cast.filter(function (item: { profile_path: null }) {
        return item.profile_path != null;
      });
    });

    this.tvService.getTvReviews(this.id).subscribe((res) => {
      this.reviews = res;
    });

    this.tvService.getRecommendedTvs(this.id).subscribe((res) => {
      this.recommended = res;
      this.recommended = this.recommended.filter(function (item: { poster_path: null }) {
        return item.poster_path != null;
      });
      this.recommended_2d = this.chunck(this.recommended, 6);
    });

    this.tvService.getSimilarTvs(this.id).subscribe((res) => {
      this.similars = res;
      this.similars = this.similars.filter(function (item: { poster_path: null }) {
        return item.poster_path != null;
      });
      this.similars_2d = this.chunck(this.similars, 6);
    });


  }

  // alert
  public addToListMessage() {
    this._success.next(`Added to watchlist.`);
  }
  public removeFromListMessage() {
    this._danger.next(`Removed from watchlist.`);
  }

  addLikes() {
    let like = new Result(
      't:' + this.id,
      this.tv['title'],
      this.tv['poster_path'],
      '/watch/tv/' + this.id
    );

    let likes = [];
    if (localStorage.getItem('Likes')) {
      likes = JSON.parse(localStorage.getItem('Likes') || '{}');
      likes = [like, ...likes];
    } else {
      likes = [like];
    }
    localStorage.setItem('Likes', JSON.stringify(likes));
    this.updateLikes();

    //alert
    this.addedToLikes = true;
    this.dangerMessage = "";
    this.addToListMessage();
  }

  removeLikes() {
    for (var i = 0; i < this.likes.length; i++) {
      if ('t:' + this.id === this.likes[i].id) {
        this.likes.splice(i, 1);
        localStorage.setItem('Likes', JSON.stringify(this.likes));
      }
    }

    //alert
    this.addedToLikes = false;
    this.successMessage = "";
    this.removeFromListMessage();
  }

  private updateLikes() {
    this.likes = JSON.parse(localStorage.getItem('Likes') || '{}');
  }

  private updateWatchList() {
    this.watches = JSON.parse(localStorage.getItem('Watches') || '{}');
  }

  private addWatchList() {
    this.updateWatchList();

    // if exists, delete first
    for (var i = 0; i < this.watches.length; i++) {
      if ('t:' + this.id === this.watches[i].id) {
        this.watches.splice(i, 1);
        localStorage.setItem('Watches', JSON.stringify(this.watches));
      }
    }

    let watch = new Result(
      't:' + this.id,
      this.tv['title'],
      this.tv['poster_path'],
      '/watch/tv/' + this.id
    );
    let watches = [];
    if (localStorage.getItem('Watches')) {
      watches = JSON.parse(localStorage.getItem('Watches') || '{}');
      watches = [watch, ...watches];
    } else {
      watches = [watch];
    }

    if (watches.length > 24) {
      watches.pop();
    }
    localStorage.setItem('Watches', JSON.stringify(watches));
  }

  // cast detail
  public cast_detail: any = {};
  public cast_social_detail: any = {};

  openModal(content: any, id: string) {
    this.castService.getCastDetails(id).subscribe((res) => {
      this.cast_detail = res;
      if (this.cast_detail.gender != null) {
        this.cast_detail.gender =
          this.cast_detail.gender == '1' ? 'Female' : 'Male';
      }
    });

    this.castService.getCastSocialDetails(id).subscribe((res) => {
      this.cast_social_detail = res;
    });

    this.modalService.open(content, { size: 'lg' });
  }


  chunck(arr:any[], chunckSize:any) {
    let res = [];
    for (var i = 0, len = arr.length; i < len; i += chunckSize) {
      res.push(arr.slice(i, i + chunckSize));
    }
    return res;
  }
}
