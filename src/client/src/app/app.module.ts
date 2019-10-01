import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';
import { MenuComponent } from './menu/menu.component';
import { RomGenerationComponent } from './rom-generation/rom-generation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeedHistoryComponent,
    MenuComponent,
    RomGenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
