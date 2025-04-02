import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterAnimationService {
  private animationFrameIds: number[] = [];
  private observers: IntersectionObserver[] = [];

  constructor(private ngZone: NgZone) {}

  /**
   * Initialize counter animations for elements
   * @param counters Counter elements to animate
   * @param options IntersectionObserver options
   */
  initCounterAnimations(counters: Element[], options: IntersectionObserverInit = {}) {
    if (!counters.length) return;
    
    this.ngZone.runOutsideAngular(() => {
      const defaultOptions = {
        threshold: 0.5
      };
      
      const mergedOptions = { ...defaultOptions, ...options };
      
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent || '0', 10);
            this.animateCounter(counter, 0, target, 2000);
            observer.unobserve(counter);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, mergedOptions);
      counters.forEach(counter => observer.observe(counter));
      
      this.observers.push(observer);
    });
    
    return this.observers.length - 1; // Return observer index for later cleanup
  }
  
  /**
   * Animate counter from start to end value
   * @param element Element to animate
   * @param start Starting value
   * @param end Ending value
   * @param duration Animation duration in ms
   */
  animateCounter(element: Element, start: number, end: number, duration: number) {
    const range = end - start;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + range * easeOutQuart);
      
      element.textContent = `${current}+`;
      
      if (progress < 1) {
        const animationFrameId = requestAnimationFrame(updateCounter);
        this.animationFrameIds.push(animationFrameId);
      }
    };
    
    const animationFrameId = requestAnimationFrame(updateCounter);
    this.animationFrameIds.push(animationFrameId);
  }
  
  /**
   * Clean up all animations and observers
   */
  cleanup() {
    // Cancel all animation frames
    this.animationFrameIds.forEach(id => {
      if (id) {
        cancelAnimationFrame(id);
      }
    });
    this.animationFrameIds = [];
    
    // Disconnect all observers
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
}
