import { Component, computed, ContentChildren, effect, output, QueryList, signal, untracked, AfterContentInit, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-slider',
  imports: [CommonModule],
  templateUrl: './content-slider.html',
  styleUrl: './content-slider.scss',
})
export class ContentSlider implements AfterContentInit {
  @ContentChildren('slideItem') slidesElements!: QueryList<ElementRef>;

  parentWidth = input.required<number>();
  dots = input<boolean>(false);
  autoScroll = input<boolean>(false);

  currentSlideOutput = output<number>();

  currentIndex = signal(0);

  slidesContainerStyle = computed(() => ({
    width: `${this.parentWidth() * this.slidesElements.length}px`,
    transform: `translateX(-${this.currentIndex() * this.parentWidth()}px)`
  }))

  getSlideStyle = () => ({
    width: `${this.parentWidth()}px`
  })

  getSlidesCount(): number {
    return this.slidesElements?.length || 0;
  }

  getDotIndices(): number[] {
    const count = this.getSlidesCount();
    return Array.from({length: count}, (_, i) => i);
  }

  ngAfterContentInit() {
    console.log(this.slidesElements)
  }

  goToPreviouse(): void {
    const isFirst = this.currentIndex() === 0;
    const newIndex = isFirst ? this.slidesElements.length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
    this.currentSlideOutput.emit(newIndex);
  }

  goToNext(): void {
    const islast = this.currentIndex() === this.slidesElements.length - 1;
    const newIndex = islast ? 0 : this.currentIndex() + 1;
    this.currentIndex.set(newIndex);
    this.currentSlideOutput.emit(newIndex);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }

  timeOutId = signal<number|undefined>(undefined);

  timeOutEffect = effect(() => {
    if(this.autoScroll()) {
      const previd = untracked(() => this.timeOutId());
      window.clearTimeout(previd);
      const id = window.setTimeout(() => {
        this.goToNext();
      }, 2000)

      untracked(() => this.timeOutId.set(id))
    }
  })
}
