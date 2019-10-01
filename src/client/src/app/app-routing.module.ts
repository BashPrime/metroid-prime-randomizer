import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';
import { RomGenerationComponent } from './rom-generation/rom-generation.component';


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
    path: 'generate-rom',
    component: RomGenerationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
