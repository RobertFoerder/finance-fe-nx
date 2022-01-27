import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsComponent } from './accounts.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AccountsComponent],
})
export class AccountsModule {}
