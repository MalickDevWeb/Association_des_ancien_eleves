import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ACTIVITIES } from './data/mock-data';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    children: [],
    canActivate: [() => {
      const router = inject(Router);
      const hasUpcomingEvent = ACTIVITIES.some(a => a.isUpcoming);
      return hasUpcomingEvent ? router.parseUrl('/activites') : router.parseUrl('/accueil');
    }]
  },
  { path: 'accueil', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'a-propos', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'organisation', loadComponent: () => import('./pages/organization/organization.component').then(m => m.OrganizationComponent) },
  { path: 'membres', loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent) },
  { path: 'talents', loadComponent: () => import('./pages/talents/talents.component').then(m => m.TalentsComponent) },
  { path: 'activites', loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent) },
  { path: 'entraide', loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent) },
  { path: 'galerie', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'temoignages', loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: '404' }
];
