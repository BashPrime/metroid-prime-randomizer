import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PickListModule } from 'primeng/picklist';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';
import { RomGenerationComponent } from './rom-generation/rom-generation.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GenerateGameComponent } from './generate-game/generate-game.component';
import { ImportSettingsModalComponent } from './import-settings-modal/import-settings-modal.component';
import { PicklistComponent } from './picklist/picklist.component';
import { TricksComponent } from './settings/tricks/tricks.component';
import { RomSettingsComponent } from './settings/rom-settings/rom-settings.component';
import { RulesComponent } from './settings/rules/rules.component';
import { SettingsComponent } from './settings/settings.component';
import { DisableControlDirective } from './directives/disable-control.directive';


@NgModule({
  declarations: [
    AppComponent,
    SeedHistoryComponent,
    RomGenerationComponent,
    RandomizerComponent,
    RulesComponent,
    WelcomeComponent,
    GenerateGameComponent,
    ImportSettingsModalComponent,
    PicklistComponent,
    TricksComponent,
    RomSettingsComponent,
    SettingsComponent,
    DisableControlDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    PickListModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
