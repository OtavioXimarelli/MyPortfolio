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

  activateProject(project: any) {
    project.isActive = true;
  }

  deactivateProject(project: any) {
    project.isActive = false;
  }
}
