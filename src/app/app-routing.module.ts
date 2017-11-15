import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { ModesPageComponent } from './modes-page/modes-page.component';
import { LogicsPageComponent } from './logics-page/logics-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'randomizer', component: RandomizerComponent },
  { path: 'modes', component: ModesPageComponent },
  { path: 'logics', component: LogicsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
