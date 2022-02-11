import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { EditFixedCostComponent } from './edit-fixed-cost.component';

@NgModule({
  declarations: [EditFixedCostComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class EditFixedCostModule {}
