import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { MonthToDatePipe, ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './add-entry.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, DatePipe, FormsModule, MonthToDatePipe, ValueInputComponent]
})
export class AddEntryComponent extends ContainerComponent implements OnInit {
  public readonly facade = inject(FinanceEntriesFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  public entry: FinanceEntry = {
    month: new Date().getMonth(),
    category: '',
    description: '',
    date: new Date().toISOString(),
  };

  public ngOnInit(): void {
    this.facade.resetAdd();
    this.entry.category = this.activatedRoute.snapshot.queryParams.category;
    this.useLatest(
      this.facade.selectedYear$,
      (selectedYear) => (this.entry.year = selectedYear)
    );
    this.useLatest(
      this.facade.selectedMonth$,
      (month) => (this.entry.month = month)
    );
    this.subscribeTo(this.facade.addError$, (error) => {
      if (error) {
        this.toastr.error('Error adding entry');
      }
    });
    this.subscribeTo(this.facade.added$, (added) => {
      if (added) {
        this.router.navigate(['/summary']);
      }
    });
  }
}
