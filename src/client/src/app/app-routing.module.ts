import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratedSeedComponent } from './generated-seed/generated-seed.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'seed-history',
    component: SeedHistoryComponent
  },
  {
    path: 'seed/:index',
    component: GeneratedSeedComponent,
    data: {
      withIndex: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
