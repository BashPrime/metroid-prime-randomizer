import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomizerComponent } from './randomizer/randomizer.component';
import { RandomComponent } from './random/random.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', component: RandomComponent },
  { path: 'help/:article', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
