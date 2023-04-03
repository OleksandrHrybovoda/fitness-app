import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
})
export class SharedModule {}
