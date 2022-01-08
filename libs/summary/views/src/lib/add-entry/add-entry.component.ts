import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { DateService } from '@finance-fe-nx/shared';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ContainerComponent } from '@finance-fe-nx/core';

@Component({
  templateUrl: './add-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEntryComponent extends ContainerComponent implements OnInit {
  public entry: FinanceEntry = {
    month: new Date().getMonth(),
    category: '',
    description: '',
  };

  constructor(
    private readonly facade: FinanceEntriesFacade,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.useLatest(
      this.facade.selectedYear$,
      (selectedYear) => (this.entry.year = selectedYear)
    );
    this.useLatest(
      this.facade.selectedMonth$,
      (month) => (this.entry.month = month)
    );
  }

  public onSubmit() {
    this.facade.addEntry(this.entry);
    this.router.navigate(['/summary']);
  }
}
