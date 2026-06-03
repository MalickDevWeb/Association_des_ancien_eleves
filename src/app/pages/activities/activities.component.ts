import { Component, signal } from '@angular/core';
import { ACTIVITIES } from '../../data/mock-data';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activities = signal(ACTIVITIES);
}
