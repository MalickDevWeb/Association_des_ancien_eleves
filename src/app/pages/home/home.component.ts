import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STATS, TALENTS, ACTIVITIES } from '../../data/mock-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  stats = signal(STATS);
  featuredTalents = signal(TALENTS.slice(0, 4));
  recentActivities = signal(ACTIVITIES.slice(0, 3));
}
