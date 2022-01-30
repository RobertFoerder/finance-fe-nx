import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { EditEntryComponent } from './edit-entry.component';

@NgModule({
  declarations: [EditEntryComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class EditEntryModule {}
