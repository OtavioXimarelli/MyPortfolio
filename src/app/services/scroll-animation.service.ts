import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observers: IntersectionObserver[] = [];

  constructor(private ngZone: NgZone) {}

  /**
   * Initialize scroll animations for elements
   * @param elements Elements to observe
   * @param options IntersectionObserver options
   */
  initScrollAnimations(elements: Element[], options: IntersectionObserverInit = {}) {
    if (!elements.length) return;
    
    const defaultOptions: IntersectionObserverInit = { 
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => {
                entry.target.classList.add('visible');
              });
            }
          });
        },
        mergedOptions
      );
      
      elements.forEach(el => observer.observe(el));
      this.observers.push(observer);
    });
    
    return this.observers.length - 1; // Return observer index for later cleanup
  }
  
  /**
   * Clean up all observers
   */
  cleanup() {
    this.observers.forEach(observer => {
      if (observer) {
        observer.disconnect();
      }
    });
    this.observers = [];
  }
  
  /**
   * Clean up specific observer by index
   * @param index Observer index to clean up
   */
  cleanupObserver(index: number) {
    if (this.observers[index]) {
      this.observers[index].disconnect();
      this.observers[index] = null as any;
    }
  }
  
  /**
   * Force visibility on all elements - useful for debugging
   * @param elements Elements to make visible
   */
  forceVisibility(elements: Element[]) {
    elements.forEach(section => {
      section.classList.add('visible');
      (section as HTMLElement).style.opacity = '1';
      (section as HTMLElement).style.transform = 'translateY(0)';
    });
  }
}
