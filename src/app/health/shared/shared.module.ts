import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ListItemComponent, WorkoutPipe, JoinPipe],
  exports: [ListItemComponent],
})
export class SharedModule {}
