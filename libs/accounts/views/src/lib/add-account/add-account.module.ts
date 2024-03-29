import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { AddAccountComponent } from './add-account.component';

@NgModule({
  declarations: [AddAccountComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class AddAccountModule {}
