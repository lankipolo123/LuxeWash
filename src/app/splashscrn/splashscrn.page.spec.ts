import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashscrnPage } from './splashscrn.page';

describe('SplashscrnPage', () => {
  let component: SplashscrnPage;
  let fixture: ComponentFixture<SplashscrnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscrnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
