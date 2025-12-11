import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  fullDate: Date;
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  @Input() initialDate: Date = new Date();
  @Input() multiSelect: boolean = true;
  @Output() dateSelected = new EventEmitter<Date[]>();
  @Output() applyClicked = new EventEmitter<Date[]>();

  currentDate: Date = new Date();
  selectedDates: Date[] = [];
  appliedDates: Date[] = [];
  currentMonth: Date = new Date();
  calendarDays: CalendarDay[] = [];
  showAppliedDates: boolean = false;

  readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  readonly weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  ngOnInit() {
    this.currentMonth = new Date(this.initialDate);
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isToday = this.isSameDay(date, new Date());
      const isSelected = this.selectedDates.some(selectedDate =>
        this.isSameDay(selectedDate, date)
      );

      this.calendarDays.push({
        date: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        fullDate: date
      });
    }
  }

  selectDay(day: CalendarDay) {
    if (!day.isCurrentMonth) return;

    const dateIndex = this.selectedDates.findIndex(selectedDate =>
      this.isSameDay(selectedDate, day.fullDate)
    );

    if (dateIndex > -1) {
      this.selectedDates.splice(dateIndex, 1);
    } else {
      if (this.multiSelect) {
        this.selectedDates.push(day.fullDate);
      } else {
        this.selectedDates = [day.fullDate];
      }
    }

    this.generateCalendar();
    this.dateSelected.emit([...this.selectedDates]);
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  applyDates() {
    this.appliedDates = [...this.selectedDates];
    this.showAppliedDates = true;
    this.applyClicked.emit([...this.selectedDates]);
  }

  get formattedAppliedDates(): string {
    if (this.appliedDates.length === 0) return '';

    const sortedDates = this.appliedDates.sort((a, b) => a.getTime() - b.getTime());
    return sortedDates.map(date =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    ).join(', ');
  }

  clearSelection() {
    this.selectedDates = [];
    this.appliedDates = [];
    this.showAppliedDates = false;
    this.generateCalendar();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  get selectedDatesCount(): number {
    return this.selectedDates.length;
  }
}