import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/core/models/meal.model';
import { Workout } from 'src/app/core/models/workout.model';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
})
export class ScheduleAssignComponent implements OnInit {
  private selected: string[] = [];

  @Input() section: any;

  @Input() list: Meal[] | Workout[] | any = [];

  @Output() update = new EventEmitter<any>();

  @Output() cancel = new EventEmitter<any>();

  ngOnInit(): void {
    this.selected = [...this.section?.assigned];
  }

  toggleItem(name: string): void {
    if (this.exists(name)) {
      this.selected = this.selected.filter((item) => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string): string[] {
    return [`../${name}/new`];
  }

  exists(name: string): boolean {
    return !!~this.selected.indexOf(name);
  }

  updateAssign(): void {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign(): void {
    this.cancel.emit();
  }
}
