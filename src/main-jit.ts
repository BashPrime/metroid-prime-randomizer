import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (window['PROD_MODE'] && !localStorage['DEV_MODE']) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  console.log('App (JIT) bootstrap complete! Yay!');
});
