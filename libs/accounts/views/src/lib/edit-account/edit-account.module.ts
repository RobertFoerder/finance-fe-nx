import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { EditAccountComponent } from './edit-account.component';

@NgModule({
  declarations: [EditAccountComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class EditAccountModule {}
