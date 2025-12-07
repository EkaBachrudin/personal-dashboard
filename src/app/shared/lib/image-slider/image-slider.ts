import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import { Slide } from '../../../types/slider.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.scss',
})
export class ImageSlider {
  slides = input.required<Slide[]>();
  parentWidth = input.required<number>();

  currentIndex = signal(0);

  slidesContainerStyle = computed(() => ({
    width: `${this.parentWidth() * this.slides().length}px`,
    transform: `translateX(-${this.currentIndex() * this.parentWidth()}px)`
  }))

  timeOutId = signal<number|undefined>(undefined);

  timeOutEffect = effect(() => {
    console.log('timeOutEffect')
    const index = this.currentIndex();
    const previd = untracked(() => this.timeOutId());
    window.clearTimeout(previd);
    const id = window.setTimeout(() => {
      this.goToNext();
    }, 2000)

    untracked(() => this.timeOutId.set(id))
  })

  getSlideStyle = (slide: Slide) => ({
    backgroundImage: `url(${slide.url})`,
    width: `${this.parentWidth()}px`
  })

  goToPreviouse(): void {
    const isFirst = this.currentIndex() === 0;
    const newIndex = isFirst ? this.slides().length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
  }

  goToNext(): void {
    const islast = this.currentIndex() === this.slides().length - 1;
    const newIndex = islast ? 0 : this.currentIndex() + 1;
    this.currentIndex.set(newIndex);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
