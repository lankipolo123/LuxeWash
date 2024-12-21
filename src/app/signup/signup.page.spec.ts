import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';

  // Dummy database of users
  private users = [
    { email: 'test@example.com', password: 'password123' }, // Existing user
  ];

  constructor(private router: Router) {}

  async signUp() {
    const existingUser = this.users.find((u) => u.email === this.email);

    if (existingUser) {
      console.error('Sign Up Failed: User already exists');
      alert('User already exists'); // Show error to user
    } else {
      // Simulate successful signup
      this.users.push({ email: this.email, password: this.password });
      console.log('Sign up successful');
      this.router.navigate(['/']); // Navigate to home or another page
    }
  }
}