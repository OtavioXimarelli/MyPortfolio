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
  // Redefinindo a posição dos techIcons para evitar sobreposição
  techIcons = [
    { alt: 'Java' },
    { alt: 'Spring' },
    { alt: 'AWS' },
    { alt: 'Docker' }
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

    // Setup tab functionality
    this.setupTabsNavigation();
    
    // Inicializar posições aleatórias para os ícones tech que não estejam sobre o texto
    this.setupTechIcons();
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

  private setupTabsNavigation() {
    setTimeout(() => {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabPanes = document.querySelectorAll('.tab-pane');
      
      tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const tabIndex = button.getAttribute('data-tab');
          
          // Update active states for buttons
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Show correct tab pane
          tabPanes.forEach(pane => pane.classList.remove('active'));
          if (tabIndex !== null) {
            tabPanes[parseInt(tabIndex)].classList.add('active');
          }
        });
      });
    }, 500);
  }

  private setupTechIcons() {
    setTimeout(() => {
      const heroWidth = document.querySelector('.hero')?.clientWidth || 1000;
      const heroHeight = document.querySelector('.hero')?.clientHeight || 600;
      
      const techIcons = document.querySelectorAll('.floating-icon');
      techIcons.forEach((icon, index) => {
        // Distribuir ícones na parte direita da tela para não sobrepor o texto
        const randomTop = 10 + Math.random() * 80; // 10% a 90% do topo
        const randomLeft = 60 + Math.random() * 35; // 60% a 95% da esquerda (região direita)
        
        (icon as HTMLElement).style.top = `${randomTop}%`;
        (icon as HTMLElement).style.left = `${randomLeft}%`;
        
        // Atraso na animação para não começarem todas ao mesmo tempo
        (icon as HTMLElement).style.animationDelay = `${index * 2}s`;
      });
    }, 100);
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
