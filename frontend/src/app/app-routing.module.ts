import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { TvDetailsComponent } from './components/tv-details/tv-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },

  { path: 'mylist', component: MylistComponent},
  {
    path: 'watch',
    children: [
      { path: 'movie/:id', component: MovieDetailsComponent },
      { path: 'tv/:id', component: TvDetailsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
