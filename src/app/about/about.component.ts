import { Component, OnInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import * as AOS from 'aos';

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

  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
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
      sections.forEach(section => {
        console.log('Making section visible:', section.id);
        section.classList.add('visible');
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      });
    }, 500);

    // Inicializar animações fora da zona do Angular
    this.ngZone.runOutsideAngular(() => {
      this.setupScrollAnimations();
      this.initCounterAnimations();
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('visible');
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    this.elementRef.nativeElement
      .querySelectorAll('.animate-on-scroll')
      .forEach((el: Element) => this.observer?.observe(el));
  }

  private initCounterAnimations() {
    const counters = this.elementRef.nativeElement.querySelectorAll('.counter');
    
    const animate = (counter: Element, start: number, end: number, duration: number) => {
      const range = end - start;
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Função de easing para animação mais suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeOutQuart);
        
        counter.textContent = `${current}+`;
        
        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(updateCounter);
        }
      };
      
      this.animationFrameId = requestAnimationFrame(updateCounter);
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent || '0', 10);
          animate(counter, 0, target, 2000);
          this.observer?.unobserve(counter);
        }
      });
    };

    const counterObserver = new IntersectionObserver(observerCallback, {
      threshold: 0.5
    });

    counters.forEach((counter: Element) => counterObserver.observe(counter));
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
