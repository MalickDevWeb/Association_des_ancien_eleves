 import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BackToTopComponent } from './layouts/back-to-top/back-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BackToTopComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen pt-[90px]">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-back-to-top></app-back-to-top>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cm2-association-pwa';
}
