import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle'; // Import Swiper's register function

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  userDetails: any = {}; // Will hold user details from localStorage

  constructor(private platform: Platform) {
    register(); // Register Swiper custom elements
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setTheme();
      this.loadUserDetails(); // Load user details when the app is initialized
    });
  }

  setTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersDarkScheme.matches) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }

    prefersDarkScheme.addEventListener('change', (event) => {
      if (event.matches) {
        document.body.setAttribute('color-theme', 'dark');
      } else {
        document.body.setAttribute('color-theme', 'light');
      }
    });
  }

  loadUserDetails() {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      this.userDetails = JSON.parse(storedUserDetails);
    } else {
      // Set default values or handle the case where no user details are stored
      this.userDetails = {
        firstName: 'Guest',
        lastName: '',
        phone: '',
        email: '',
      };
    }
  }

  toggleMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.toggle();
    }
  }
}
