import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  // Liste de sujets prédéfinis
  subjects = [
    'Adhésion à l\'association',
    'Partenariat / Sponsoring',
    'Demande d\'information',
    'Organisation d\'événement',
    'Entraide et soutien',
    'Autre'
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^(\+221|0)?[7-8][0-9]{8}$/)]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get phone() { return this.contactForm.get('phone'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  // Vérifier si un champ est "touched" et invalide
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Messages d'erreur personnalisés
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Ce champ est obligatoire';
    if (field.errors['email']) return 'Veuillez entrer un email valide';
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Maximum ${maxLength} caractères autorisés`;
    }
    if (field.errors['pattern']) {
      if (fieldName === 'phone') return 'Numéro invalide (ex: +221771234567 ou 0771234567)';
      return 'Format invalide';
    }
    return 'Champ invalide';
  }

  // Compteur de caractères pour le message
  getMessageLength(): number {
    return this.message?.value?.length || 0;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      // Marquer tous les champs comme "touched" pour afficher les erreurs
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    // Simulation d'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitStatus.set('success');
      this.contactForm.reset();

      // Masquer le message de succès après 5 secondes
      setTimeout(() => this.submitStatus.set('idle'), 5000);
    }, 1500);
  }
}
