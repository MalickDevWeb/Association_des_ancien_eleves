import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images = signal([
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
    'https://images.unsplash.com/photo-1529070538774-1843cb1665eb?w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    'https://images.unsplash.com/photo-1593113580327-1428bd71e72b?w=800&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
  ]);
}
