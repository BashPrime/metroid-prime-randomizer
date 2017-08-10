import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

if (window['PROD_MODE'] && !localStorage['DEV_MODE']) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory).then(() => {
  console.log('App (AOT) bootstrap complete!');
});
