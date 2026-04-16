import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthToDatePipe, ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, FormsModule, MonthToDatePipe, ValueInputComponent],
})
export class AddEntryComponent {
  readonly store = inject(FinanceEntriesStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  public entry: FinanceEntry = {
    month: new Date().getMonth(),
    category: '',
    description: '',
    date: new Date().toISOString(),
  };

  constructor() {
    this.store.resetAdd();
    this.entry.category = this.activatedRoute.snapshot.queryParams.category;
    this.entry.year = this.store.selectedYear();
    this.entry.month = this.store.selectedMonth();

    effect(() => {
      if (this.store.addError()) {
        this.toastr.error('Error adding entry');
      }
    });
    effect(() => {
      if (this.store.added()) {
        this.router.navigate(['/summary']);
      }
    });
  }
}
