import { Injectable, signal } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class BreakPointService {
  private readonly breakpoint = 1280;

  // Signal to track if screen is under 1280px (true when screen width < 1280px)
  readonly under1280 = signal<boolean>(false);

  // Additional signal to track navbar visibility with manual override capability
  readonly isBreakpoint = signal<boolean>(true);

  // Signal to track current screen width
  readonly screenWidth = signal<number>(0);

  constructor() {
    this.initializeScreenDetection();
  }

  private initializeScreenDetection(): void {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth),
        takeUntilDestroyed()
      )
      .subscribe((width) => {
        this.screenWidth.set(width);
        const isUnder1280 = width < this.breakpoint;
        this.under1280.set(isUnder1280);
        // Auto-hide navbar when under 1280px, show when above
        this.isBreakpoint.set(!isUnder1280);
      });
  }

  // Method to manually check if screen is above breakpoint
  isAboveBreakpoint(): boolean {
    return window.innerWidth >= this.breakpoint;
  }

  // Get current breakpoint value
  getBreakpoint(): number {
    return this.breakpoint;
  }

  // Manual toggle method for navbar visibility
  toggle(): void {
    // Only allow manual toggle when screen is above 1280px
    this.isBreakpoint.update(current => !current);
  }

  // Method to manually set navbar visibility
  setNavbarVisibility(visible: boolean): void {
    // Only allow manual setting when screen is above 1280px
    if (this.isAboveBreakpoint()) {
      this.isBreakpoint.set(visible);
    }
  }
}