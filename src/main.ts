import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

environment.mode = 'prod';
if (window.location.hostname.indexOf('test') > -1) {
  environment.mode = 'test';
}
if (window.location.hostname.indexOf('localhost') > -1
  || window.location.hostname.indexOf('dev') > -1) {
  environment.mode = 'dev';
}
// console.log(document.location.search);
const usp = new URLSearchParams(document.location.search);
if (usp.has('mode')) {
  const mode = usp.get('mode');
  if (mode === 'prod') {
    environment.mode = mode;
  }
  if (mode === 'test') {
    environment.mode = mode;
  }
  if (mode === 'local') {
    environment.mode = mode;
  }
}
console.log('Mode     : ' + environment.mode);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
