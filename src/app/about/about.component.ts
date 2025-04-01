import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profileImage = 'assets/profile.jpg';
  fallbackImage = 'assets/profile-placeholder.jpg';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.add('visible');
      });
    }, 100);
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
    this.initCounterAnimations();
  }

  private setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  private initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent || '0', 10);
      let count = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      const updateCount = () => {
        if (count < target) {
          count += step;
          counter.textContent = Math.round(count) + '+';
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + '+';
        }
      };

      updateCount();
    });
  }

  handleImageError() {
    this.profileImage = this.fallbackImage;
  }

  scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
