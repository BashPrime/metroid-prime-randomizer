import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { RomSettingsComponent } from './rom-settings/rom-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/randomizer/rom-settings', pathMatch: 'full' },
  {
    path: 'randomizer',
    component: RandomizerComponent,
    children: [
      { path: '', redirectTo: 'rom-settings', pathMatch: 'full' },
      {
        path: 'rom-settings',
        component: RomSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
