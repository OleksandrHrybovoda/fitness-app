import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input() selected!: Date;

  @Output() move = new EventEmitter<number>();

  moveDate(offset: number): void {
    this.offset = offset;
    this.move.emit(offset);
  }
}
