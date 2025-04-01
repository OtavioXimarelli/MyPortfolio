import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();
  
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.enableDarkMode();
    }
  }
  
  toggleTheme() {
    if (this.darkMode.value) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }
  
  private enableDarkMode() {
    this.renderer.addClass(document.body, 'dark-theme');
    localStorage.setItem('theme', 'dark');
    this.darkMode.next(true);
  }
  
  private disableDarkMode() {
    this.renderer.removeClass(document.body, 'dark-theme');
    localStorage.setItem('theme', 'light');
    this.darkMode.next(false);
  }
}
