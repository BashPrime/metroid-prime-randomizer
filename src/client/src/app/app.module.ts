import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PickListModule } from 'primeng/picklist';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GenerateGameComponent } from './generate-game/generate-game.component';
import { ImportSettingsModalComponent } from './import-settings-modal/import-settings-modal.component';
import { PicklistComponent } from './picklist/picklist.component';
import { TricksComponent } from './settings/tricks/tricks.component';
import { RomSettingsComponent } from './settings/rom-settings/rom-settings.component';
import { RulesComponent } from './settings/rules/rules.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { SavePresetModalComponent } from './save-preset-modal/save-preset-modal.component';
import { RemovePresetModalComponent } from './remove-preset-modal/remove-preset-modal.component';
import { ReadOnlySettingsContainerComponent } from './settings/read-only-settings-container/read-only-settings-container.component';
import { CustomizeSettingsContainerComponent } from './settings/customize-settings-container/customize-settings-container.component';
import { ExcludeLocationsComponent } from './settings/exclude-locations/exclude-locations.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ProgressModalComponent } from './progress-modal/progress-modal.component';
import { ItemOverridesComponent } from './item-overrides/item-overrides.component';
import { HelpComponent } from './help/help.component';
import { PrimeIsoDiagnosticsModalComponent } from './prime-iso-diagnostics-modal/prime-iso-diagnostics-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SeedHistoryComponent,
    RandomizerComponent,
    RulesComponent,
    WelcomeComponent,
    GenerateGameComponent,
    ImportSettingsModalComponent,
    PicklistComponent,
    TricksComponent,
    RomSettingsComponent,
    DisableControlDirective,
    SavePresetModalComponent,
    RemovePresetModalComponent,
    ReadOnlySettingsContainerComponent,
    CustomizeSettingsContainerComponent,
    ExcludeLocationsComponent,
    GameDetailsComponent,
    ProgressModalComponent,
    ItemOverridesComponent,
    HelpComponent,
    PrimeIsoDiagnosticsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PickListModule,
    TooltipModule,
    ToastrModule.forRoot({
      toastClass: 'notification',
      iconClasses: {
        error: 'is-danger',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning'
      },
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    ClipboardModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
