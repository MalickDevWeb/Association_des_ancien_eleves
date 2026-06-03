import { Component, signal } from '@angular/core';
import { BUREAU_MEMBERS } from '../../data/mock-data';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {
  bureauMembers = signal(BUREAU_MEMBERS);
}
