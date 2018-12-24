import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileService } from './services/file.service';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { RomSettingsComponent } from './rom-settings/rom-settings.component';
import { MainRulesComponent } from './main-rules/main-rules.component';
import { ItemLogicComponent } from './item-logic/item-logic.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomizerComponent,
    RomSettingsComponent,
    MainRulesComponent,
    ItemLogicComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
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
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
