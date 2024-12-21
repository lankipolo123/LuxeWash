import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  private splashScreenVisible = false; // Changed variable name to avoid duplication

  constructor() { }

  // Check if splash screen should be visible
  public isSplashScreenVisible(): boolean {
    return this.splashScreenVisible;
  }

  // Show splash screen
  public showSplashScreen(): void {
    this.splashScreenVisible = true;
  }

  // Hide splash screen
  public hideSplashScreen(): void {
    this.splashScreenVisible = false;
  }
}
