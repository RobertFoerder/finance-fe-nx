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
    value: 0,
  };

  public availableMonths$: Observable<number[]> =
    this.facade.selectedYear$.pipe(
      map((selectedYear) => this.dateService.getAvailableMonths(selectedYear))
    );

  constructor(
    private readonly facade: FinanceEntriesFacade,
    private readonly dateService: DateService,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.useLatest(
      this.facade.selectedYear$,
      (selectedYear) => (this.entry.year = selectedYear)
    );
  }

  public onSubmit() {
    this.facade.addEntry(this.entry);
    this.router.navigate(['/summary']);
  }
}
