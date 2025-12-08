import { Component } from '@angular/core';
import { ContentSlider } from '../../shared/lib/content-slider/content-slider';

@Component({
  selector: 'app-products',
  imports: [ContentSlider],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // Blank products page - functionality can be added later
}