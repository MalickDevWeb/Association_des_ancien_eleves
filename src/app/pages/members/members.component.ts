import { Component, signal } from '@angular/core';
import { MEMBERS } from '../../data/mock-data';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  members = signal(MEMBERS);
}
