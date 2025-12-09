import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from '../../../types/product.type';
import { ContentSlider } from "../../../shared/lib/content-slider/content-slider";

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, ContentSlider],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<ProductList>();

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