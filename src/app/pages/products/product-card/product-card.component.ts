import { Component, input, computed, viewChild, signal, effect, inject, DestroyRef, ElementRef } from '@angular/core';

import { ProductList } from '../../../types/product.type';
import { ContentSlider } from "../../../shared/lib/content-slider/content-slider";

@Component({
  selector: 'app-product-card',
  imports: [ContentSlider],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<ProductList>();

  parentElement = viewChild.required<ElementRef<HTMLDivElement>>('parentElement');
  parentWidth = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      const element = this.parentElement().nativeElement;
      if (element) {
        this.parentWidth.set(element.clientWidth);

        const resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            this.parentWidth.set(entry.contentRect.width);
          }
        });

        resizeObserver.observe(element);

        destroyRef.onDestroy(() => {
          resizeObserver.disconnect();
        });
      }
    });
  }

  stars = computed(() => {
    const rating = this.product().starsScore;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return Array.from({ length: 5 }, (_, i) => ({
      index: i,
      filled: i < fullStars,
      half: i === fullStars && hasHalfStar
    }));
  });
}