import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashService } from '../services/splash.service';

@Component({
  selector: 'app-splashscrn',
  templateUrl: './splashscrn.page.html',
  styleUrls: ['./splashscrn.page.scss'],
})
export class SplashscrnPage implements OnInit {

  constructor(private router: Router, private splashService: SplashService) {}

  ngOnInit() {
    // Show splash screen for a fixed duration (2.5 seconds)
    setTimeout(() => {
      this.router.navigate(['/login']); // Navigate to login page after timeout
    }, 2500);
  }
}
