import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TALENTS } from '../../data/mock-data';

@Component({
  selector: 'app-talents',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './talents.component.html',
  styleUrl: './talents.component.css'
})
export class TalentsComponent {
  talents = signal(TALENTS);
  
  // Catégories uniques extraites dynamiquement
  categories = computed(() => [...new Set(this.talents().map(t => t.category))]);
  activeCategory = signal('Tous');

  // computed() garantit la mise à jour automatique quand activeCategory change
  filteredTalents = computed(() => {
    if (this.activeCategory() === 'Tous') return this.talents();
    return this.talents().filter(t => t.category === this.activeCategory());
  });

  setCategory(category: string) {
    this.activeCategory.set(category);
  }
}
