import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, BehaviorSubject, OperatorFunction } from 'rxjs'
import { switchMap, map, debounceTime, catchError, distinctUntilChanged, tap } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Result } from 'src/app/models/Result';
import { MovieService } from 'src/app/services/movie.service';
import { FormsModule } from '@angular/forms'
import { SearchService } from 'src/app/services/search.service';
import { Location } from '@angular/common';


declare var $: any;


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  public title: string = "Navbar";

  constructor(private httpClient: HttpClient,
              private movieService: MovieService,
              private searchService: SearchService,
              private location: Location,
             ) { }

  ngOnInit(): void {

    $(document).ready(function() {
      // get current URL path and assign 'active' class
      var pathname = window.location.pathname;
      $('.nav > li > a[href="'+pathname+'"]').parent().addClass('active');
    })

    // $( '#listTab' ).on( 'click',  () => {
    //   alert("!!!");
    //   $( ' .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
    //   $( this ).parent( 'li' ).addClass( 'active' );
    // });

  //   $(".nav .nav-link").on("click", () =>{
  //     $(".nav").find(".active").removeClass("active");
  //     $(this).parent().addClass("active");
  //  });

//   $(document).ready(() => {
//     $.each($('#navbar').find('li'), () => {
//         $(this).toggleClass('active',
//             window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
//     });
// });

// $(document).ready(() => {
//   $(document).on('click', '.nav-item a',  () => {
//     console.log($(this));
//       $(this).parent().addClass('active').siblings().removeClass('active');
//   });
// });

// $( ' #listTab' ).on( 'click',  () => {
//   $( ' #homeTab' ).removeClass( 'active' );
//   $( this ).addClass( 'active' );
// });
// $( ' #homeTab' ).on( 'click',  () => {
//   $( ' #listTab' ).removeClass( 'active' );
//   $( this ).addClass( 'active' );
// });

  }



  public model: any;
  searching = false;
  searchFailed = false;


  formatter = (x: {name: string}) => x.name;

  public selectedItem(item: { item: any; }){
    let media = item.item;
    window.open(`/watch/${media.media_type}/${media.id}`,"_self");
  }

  search: OperatorFunction<string, {id:number,name:string,backdrop_path:string}[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.searchService.search(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  // public focusNavBar() {
  //   if (this.location.path() === "") {
  //     if (document.getElementById("home")) {
  //       document.getElementById("home").focus();
  //     }
  //   } else if ((this.location.path() === "/mylist")) {
  //     if (document.getElementById("myList")) {
  //       document.getElementById("myList").focus();
  //     }
  //   }
  // }


  // colorSearchTextInput = new FormControl();

  // searchColor$ = new BehaviorSubject<string>('');

  // results$: Observable<string[]> = this.searchColor$.pipe(

  //   debounceTime(500),
  //   switchMap(searchColorText => {
  //     if (searchColorText === '') {
  //       return of([]);
  //     }
  //     return this.httpClient
  //       .get<Result[]>('http://localhost:5000/api/movies/search/' + searchColorText);
  //   }),
  //   map((results: Result[]) => results.map(result => result.title)),
  // );

  // doColorSearch() {
  //   this.searchColor$.next(this.colorSearchTextInput.value);
  // }

}
