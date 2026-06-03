import { Component, signal, computed, OnInit } from '@angular/core';
import { ACTIVITIES } from '../../data/mock-data';
import { CommonModule } from '@angular/common';

type RsvpAnswer = 'yes' | 'no' | 'maybe';
type StatsMap = Record<number, { views: number; yes: number; no: number; maybe: number }>;

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit {
  activities = signal(ACTIVITIES);
  selectedActivity = signal<typeof ACTIVITIES[0] | null>(null);

  // Loaded from localStorage
  myResponse = signal<Record<number, RsvpAnswer>>({});
  stats = signal<StatsMap>({});

  ngOnInit() {
    // Load my personal response
    try {
      const saved = localStorage.getItem('aemt_rsvp');
      if (saved) this.myResponse.set(JSON.parse(saved));
      const savedStats = localStorage.getItem('aemt_stats');
      if (savedStats) this.stats.set(JSON.parse(savedStats));
    } catch {}

    // Increment view for all activities on load
    // (views tracked separately, not per-person)
  }

  getResponse(id: number): RsvpAnswer | null {
    return this.myResponse()[id] ?? null;
  }

  getStat(id: number) {
    return this.stats()[id] ?? { views: 0, yes: 0, no: 0, maybe: 0 };
  }

  respondToEvent(activityId: number, answer: RsvpAnswer) {
    const prev = this.myResponse()[activityId] ?? null;
    if (prev === answer) return; // already voted same, do nothing

    // Update stats
    this.stats.update(s => {
      const cur = s[activityId] ?? { views: 0, yes: 0, no: 0, maybe: 0 };
      const updated = { ...cur };
      // Remove previous vote
      if (prev) updated[prev] = Math.max(0, updated[prev] - 1);
      // Add new vote
      updated[answer] = (updated[answer] || 0) + 1;
      return { ...s, [activityId]: updated };
    });

    // Save my response
    this.myResponse.update(r => ({ ...r, [activityId]: answer }));

    // Persist
    try {
      localStorage.setItem('aemt_rsvp', JSON.stringify(this.myResponse()));
      localStorage.setItem('aemt_stats', JSON.stringify(this.stats()));
    } catch {}
  }

  openDetail(activity: typeof ACTIVITIES[0]) {
    this.selectedActivity.set(activity);
    document.body.style.overflow = 'hidden';
    // Increment view count
    this.stats.update(s => {
      const cur = s[activity.id] ?? { views: 0, yes: 0, no: 0, maybe: 0 };
      return { ...s, [activity.id]: { ...cur, views: cur.views + 1 } };
    });
    try { localStorage.setItem('aemt_stats', JSON.stringify(this.stats())); } catch {}
  }

  closeDetail() {
    this.selectedActivity.set(null);
    document.body.style.overflow = '';
  }
}

