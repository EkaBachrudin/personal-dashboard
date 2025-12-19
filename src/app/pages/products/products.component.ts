import { Component, ViewChild, ElementRef, signal, DestroyRef, AfterViewInit, inject } from '@angular/core';
import { ContentSlider } from '../../shared/lib/content-slider/content-slider';
import { ProductCardComponent } from './product-card/product-card.component';
import { productList } from './products.data';

@Component({
  selector: 'app-products',
  imports: [ContentSlider, ProductCardComponent],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit {
  products = productList;
  isHeroLoad: boolean = false;

  @ViewChild('parentElement') parentElementRef!: ElementRef;
  parentWidth = signal(0);

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isHeroLoad = true;
  }

  ngAfterViewInit() {
    if (this.parentElementRef?.nativeElement) {
      // Set initial width
      this.parentWidth.set(this.parentElementRef.nativeElement.clientWidth);

      // Set up ResizeObserver to track width changes
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          this.parentWidth.set(width);
        }
      });

      resizeObserver.observe(this.parentElementRef.nativeElement);

      // Clean up observer when component is destroyed
      this.destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
      });
    }
  }
}