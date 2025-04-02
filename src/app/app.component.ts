import { Component, OnInit, HostListener } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isMobileMenuOpen = false;
  scrolled = false;

  ngOnInit() {
    console.log('AppComponent initialized');
    // Initialize AOS
    setTimeout(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    this.scrolled = scrollPosition > 50;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
