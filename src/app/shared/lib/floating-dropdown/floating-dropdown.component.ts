import { Component, EventEmitter, HostListener, Output, ViewChild, ElementRef, AfterContentInit, Input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-dropdown.component.html',
  styleUrls: ['./floating-dropdown.component.scss']
})
export class FloatingDropdownComponent implements AfterContentInit {
  @Input() triggerElement?: HTMLElement;
  @Input() customClasses: string = '';
  @Output() close = new EventEmitter<void>();
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit() {
    this.positionDropdown();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.dropdown && !this.dropdown.nativeElement.contains(event.target) && this.triggerElement && !this.triggerElement.contains(event.target as Node)) {
      this.close.emit();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.positionDropdown();
  }

  positionDropdown() {
    if (this.dropdown && this.triggerElement) {
      const dropdownEl = this.dropdown.nativeElement;
      const triggerRect = this.triggerElement.getBoundingClientRect();

      // Position dropdown below the trigger element
      this.renderer.setStyle(dropdownEl, 'position', 'fixed');
      this.renderer.setStyle(dropdownEl, 'top', `${triggerRect.bottom + 8}px`); // 8px gap
      this.renderer.setStyle(dropdownEl, 'left', `${triggerRect.left}px`);
      this.renderer.setStyle(dropdownEl, 'min-width', `${triggerRect.width}px`);

      // Adjust if dropdown goes off screen
      setTimeout(() => {
        const dropdownRect = dropdownEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (dropdownRect.right > viewportWidth) {
          this.renderer.setStyle(dropdownEl, 'left', `${viewportWidth - dropdownRect.width - 16}px`);
        }

        if (dropdownRect.left < 0) {
          this.renderer.setStyle(dropdownEl, 'left', '16px');
        }
      }, 0);
    }
  }

  onClose() {
    this.close.emit();
  }
}