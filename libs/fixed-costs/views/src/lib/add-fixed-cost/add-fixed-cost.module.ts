import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { AddFixedCostComponent } from './add-fixed-cost.component';

@NgModule({
  declarations: [AddFixedCostComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class AddFixedCostModule {}
