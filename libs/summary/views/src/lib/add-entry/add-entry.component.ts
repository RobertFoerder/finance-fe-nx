import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { DateService } from '@finance-fe-nx/shared';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEntryComponent {
  public entry: FinanceEntry = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    category: '',
    description: '',
    value: 0,
  };

  public availableMonths = this.dateService.getAvailableMonths(this.entry.year);

  constructor(
    private readonly facade: FinanceEntriesFacade,
    private readonly dateService: DateService,
    private readonly router: Router
  ) {}

  public onSubmit() {
    this.facade.addEntry(this.entry);
    this.router.navigate(['/summary']);
  }
}
