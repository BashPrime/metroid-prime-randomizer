import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomizerComponent } from './randomizer/randomizer.component';

const routes: Routes = [
  { path: '', component: RandomizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
