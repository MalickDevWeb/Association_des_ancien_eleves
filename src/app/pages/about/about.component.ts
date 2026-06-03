import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/ecole-cour.png',
    'assets/images/ecole-entree.png'
  ];
  currentImageIndex = signal(0);
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex.update(idx => (idx + 1) % this.images.length);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
