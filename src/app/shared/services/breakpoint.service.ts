import { Injectable, signal } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class BreakPointService {
  setup = 0;

  // Signal to track if screen is under breakpoint setup (true when screen width < breakpoint setup)
  readonly underBreakpoint = signal<boolean>(false);

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
        const isunderBreakpoint = width < this.setup;
        this.underBreakpoint.set(isunderBreakpoint);
        // Auto-hide navbar when under breakpoint setup, show when above
        this.isBreakpoint.set(!isunderBreakpoint);
      });
  }

  // Method to manually check if screen is above breakpoint
  isAboveBreakpoint(): boolean {
    return window.innerWidth >= this.setup;
  }

  // Get current breakpoint value
  getBreakpoint(): number {
    return this.setup;
  }

  // Manual toggle method for navbar visibility
  toggle(): void {
    // Only allow manual toggle when screen is above breakpoint setup
    this.isBreakpoint.update(current => !current);
  }

  // Method to manually set navbar visibility
  setNavbarVisibility(visible: boolean): void {
    // Only allow manual setup when screen is above breakpoint setup
    if (this.isAboveBreakpoint()) {
      this.isBreakpoint.set(visible);
    }
  }
}