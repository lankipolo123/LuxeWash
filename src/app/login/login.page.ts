import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  identifier: string = ''; // This will hold either email or phone number
  password: string = '';
  errorMessage: string = ''; // Holds the error message when login fails

  constructor(private router: Router) {}

  // Function for local login
  login() {
    // Retrieve stored credentials from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Validate that credentials are stored
    if (!storedEmail || !storedPassword) {
      this.errorMessage = 'No registered account found. Please sign up first.';
      return;
    }

    // Check if entered identifier (email or phone) matches the stored email
    if (this.identifier === storedEmail && this.password === storedPassword) {
      console.log('Login successful');
      this.router.navigate(['/tabs/home']); // Navigate to home page after successful login
      this.errorMessage = ''; // Clear error message
    } else {
      console.error('Login failed');
      this.errorMessage = 'Invalid email or password. Please try again.'; // Set error message if login fails
    }
  }

  // Function to focus on the next input field (password field) when "Enter" is pressed on the email input
  focusNextField(field: string) {
    setTimeout(() => {
      const nextField = document.querySelector(`ion-input[name="${field}"]`) as HTMLIonInputElement;
      if (nextField) {
        nextField.setFocus();
      }
    }, 50);
  }
}
