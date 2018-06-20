import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {RandomizerComponent} from './randomizer/randomizer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModesPageComponent } from './modes-page/modes-page.component';
import { LogicsPageComponent } from './logics-page/logics-page.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomizerComponent,
    HomePageComponent,
    ModesPageComponent,
    LogicsPageComponent,
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
