import { Component } from '@angular/core';
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
export class ProductsComponent {
  caraouselWidht: number = window.innerWidth;
  products = productList;
}