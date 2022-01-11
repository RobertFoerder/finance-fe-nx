import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEntryComponent extends ContainerComponent implements OnInit {
  public entry: FinanceEntry = {
    month: new Date().getMonth(),
    category: '',
    description: '',
  };

  public isIncome = false;

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService
  ) {
    super();
  }

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

  public onSubmit() {
    if (!this.isIncome && this.entry.value) {
      this.entry.value = -this.entry.value;
    }
    this.facade.addEntry(this.entry);
  }
}
