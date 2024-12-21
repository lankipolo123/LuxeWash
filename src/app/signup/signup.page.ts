import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  firstName: string = ''; // First Name
  middleInitial: string = ''; // Middle Initial
  lastName: string = ''; // Last Name
  email: string = ''; // Email
  phone: string = ''; // Phone Number
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async signUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.firstName || !this.lastName) {
      this.errorMessage = 'First and Last Name are required';
      return;
    }

    try {
      let signUpData;
      if (this.email) {
        signUpData = await this.authService.signUp(this.email, this.password);
      } else if (this.phone) {
        signUpData = await this.authService.signUpWithPhone(this.phone, this.password);
      } else {
        this.errorMessage = 'Please provide either an email or phone number.';
        return;
      }

      // Save credentials to localStorage
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);

      console.log('Sign up successful', signUpData);
      this.router.navigate(['/login']);
      this.errorMessage = '';
    } catch (error: any) {
      console.error('Sign Up Failed:', error.message);
      this.errorMessage = error.message || 'An unknown error occurred.';
    }
  }

  focusNextField(field: string) {
    setTimeout(() => {
      const nextField = document.querySelector(`ion-input[name="${field}"]`) as HTMLIonInputElement;
      if (nextField) {
        nextField.setFocus();
      }
    }, 50);
  }
}
