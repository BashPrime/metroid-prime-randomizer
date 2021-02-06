import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';

const routes: Routes = [
  {
    path: '',
    component: RandomizerComponent
  },
  {
    path: 'history',
    component: SeedHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
