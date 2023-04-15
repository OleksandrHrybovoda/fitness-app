import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ScheduleItem, ScheduleList } from 'src/app/core/models/schedule.model';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDay!: Date;
  selectedDayIndex!: number;
  selectedWeek!: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input()
  set date(date: Date | undefined | null) {
    this.selectedDay = date ? new Date(date.getTime()) : new Date();
  }

  @Input() items!: ScheduleList | undefined | null;

  @Output() change = new EventEmitter<Date>();

  @Output() select = new EventEmitter<any>();

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string): void {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
  }

  selectDay(index: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }

    return today;
  }
}
