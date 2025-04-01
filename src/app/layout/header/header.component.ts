import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header [class.scrolled]="scrolled">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/" class="logo-link">
            <span class="primary-text">Otavio.</span>
            <span class="accent-text">.Dev</span>
          </a>
        </div>
        
        <nav class="desktop-nav">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Sobre</a></li>
            <li><a routerLink="/skills" routerLinkActive="active">Habilidades</a></li>
            <li><a routerLink="/projects" routerLinkActive="active">Projetos</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contato</a></li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
            <svg *ngIf="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
            </svg>
            <svg *ngIf="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
          </button>
          <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" aria-label="Toggle menu">
            <span [class.open]="mobileMenuOpen"></span>
          </button>
        </div>
      </div>
      
      <nav class="mobile-nav" [class.open]="mobileMenuOpen">
        <ul>
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">Sobre</a></li>
          <li><a routerLink="/skills" routerLinkActive="active" (click)="closeMobileMenu()">Habilidades</a></li>
          <li><a routerLink="/projects" routerLinkActive="active" (click)="closeMobileMenu()">Projetos</a></li>
          <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMobileMenu()">Contato</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  mobileMenuOpen = false;
  isDarkMode = false;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
