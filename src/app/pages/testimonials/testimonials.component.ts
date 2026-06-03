import { Component, signal } from '@angular/core';
import { TESTIMONIALS } from '../../data/mock-data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials = signal(TESTIMONIALS);
}
