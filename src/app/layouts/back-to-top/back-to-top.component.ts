import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="scrollToTop()"
      [class.opacity-0]="!isVisible()"
      [class.pointer-events-none]="!isVisible()"
      [class.opacity-100]="isVisible()"
      class="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-all duration-300 flex items-center justify-center group"
      aria-label="Retour en haut de la page"
      title="Retour en haut">
      <svg class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
      </svg>
    </button>
  `,
  styles: []
})
export class BackToTopComponent {
  isVisible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isVisible.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
