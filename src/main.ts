import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Enable production mode if running in production environment
if (environment.production) {
  enableProdMode();
  // Remove console logs in production
  if (window) {
    window.console.log = () => {};
    window.console.warn = () => {};
    window.console.info = () => {};
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
