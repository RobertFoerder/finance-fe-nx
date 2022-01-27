import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddAccountComponent } from './add-account.component';

@NgModule({
  declarations: [AddAccountComponent],
  imports: [CommonModule, FormsModule],
})
export class AddAccountModule {}
