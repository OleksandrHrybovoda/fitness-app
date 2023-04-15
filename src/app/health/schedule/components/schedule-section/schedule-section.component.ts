import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ScheduleItem } from 'src/app/core/models/schedule.model';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent {
  @Input() name!: string;

  @Input() section!: ScheduleItem;

  @Output() select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] | any[] = []): void {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data,
    });
  }
}
