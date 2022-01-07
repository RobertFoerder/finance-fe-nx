import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { AddEntryComponent } from './add-entry.component';

@NgModule({
  declarations: [AddEntryComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class AddEntryModule {}
