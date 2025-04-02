import { Component, OnInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import * as AOS from 'aos';
import { ScrollAnimationService } from '../services/scroll-animation.service';
import { CounterAnimationService } from '../services/counter-animation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  profileImage = 'assets/profile.jpg';
  fallbackImage = 'assets/profile-placeholder.jpg';

  techIcons = [
    { src: 'assets/icons/java.svg', alt: 'Java' },
    { src: 'assets/icons/spring.svg', alt: 'Spring' },
    { src: 'assets/icons/aws.svg', alt: 'AWS' },
    { src: 'assets/icons/docker.svg', alt: 'Docker' }
  ];

  timeline = [
    {
      title: 'Início da Jornada em Programação',
      description: 'Primeiro contato com Java e desenvolvimento de software.',
      date: '2023'
    },
    {
      title: 'Projetos com Spring Boot',
      description: 'Desenvolvimento de aplicações usando Spring Boot e APIs REST.',
      date: '2023'
    },
    {
      title: 'Cloud & DevOps',
      description: 'Aprendizado em AWS, Docker e práticas DevOps.',
      date: '2024'
    },
    {
      title: 'Inovação com IA',
      description: 'Exploração de Spring AI e integração com agentes de IA.',
      date: '2024'
    }
  ];

  projectShowcase = [
    {
      title: 'API REST com Spring Boot',
      description: 'API RESTful desenvolvida com Spring Boot e boas práticas',
      icon: 'assets/icons/spring.svg',
      technologies: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL'],
      githubUrl: 'https://github.com/seu-usuario/projeto1',
      demoUrl: 'https://sua-demo.com',
      isActive: false
    },
    {
      title: 'Integração com AWS',
      description: 'Sistema de upload de arquivos integrado com AWS S3',
      icon: 'assets/icons/aws.svg',
      technologies: ['Java', 'AWS S3', 'Spring Cloud AWS'],
      githubUrl: 'https://github.com/seu-usuario/projeto2',
      isActive: false
    },
    {
      title: 'Spring AI Chat',
      description: 'Chatbot integrado com modelos de IA',
      icon: 'assets/icons/ai.svg',
      technologies: ['Spring AI', 'OpenAI', 'WebSocket'],
      githubUrl: 'https://github.com/seu-usuario/projeto3',
      demoUrl: 'https://sua-demo.com',
      isActive: false
    },
    {
      title: 'Docker Compose Setup',
      description: 'Ambiente de desenvolvimento containerizado',
      icon: 'assets/icons/docker.svg',
      technologies: ['Docker', 'Docker Compose', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/seu-usuario/projeto4',
      isActive: false
    }
  ];

  private scrollObserverId?: number;
  private counterObserverId?: number;

  constructor(
    private elementRef: ElementRef, 
    private ngZone: NgZone,
    private scrollAnimationService: ScrollAnimationService,
    private counterAnimationService: CounterAnimationService
  ) {
    console.log("AboutComponent constructed");
  }

  ngOnInit() {
    console.log("AboutComponent initialized");
    
    // Initialize AOS
    setTimeout(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
      });
      
      console.log('AOS initialized');
      
      // Force visibility for debugging
      const sections = document.querySelectorAll('section');
      this.scrollAnimationService.forceVisibility(Array.from(sections));
    }, 500);

    // Initialize animations outside Angular zone for better performance
    this.initAnimations();
  }

  ngOnDestroy() {
    // Clean up animations
    this.scrollAnimationService.cleanup();
    this.counterAnimationService.cleanup();
  }

  private initAnimations() {
    // Initialize scroll animations
    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length) {
      this.scrollObserverId = this.scrollAnimationService.initScrollAnimations(Array.from(animatedElements));
    }

    // Initialize counter animations
    const counters = this.elementRef.nativeElement.querySelectorAll('.counter');
    if (counters.length) {
      this.counterObserverId = this.counterAnimationService.initCounterAnimations(Array.from(counters));
    }
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

  activateProject(project: any) {
    project.isActive = true;
  }

  deactivateProject(project: any) {
    project.isActive = false;
  }
}
