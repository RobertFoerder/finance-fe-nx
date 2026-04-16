import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateService } from '@finance-fe-nx/shared';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';
import { MonthlySummaryComponent } from './monthly-summary/monthly-summary.component';
import { CategorySummaryComponent } from './category-summary/category-summary.component';

@Component({
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe, FormsModule, MonthlySummaryComponent, CategorySummaryComponent],
})
export class SummaryComponent {
  readonly store = inject(FinanceEntriesStore);
  private readonly dateService = inject(DateService);

  public availableYears: number[] = [];
  public displayType: 'month' | 'category' = 'month';

  readonly availableMonths = computed(() =>
    this.dateService.getAvailableMonths(this.store.selectedYear()),
  );

  constructor() {
    this.loadAvailableYears();
    this.store.init();
  }

  public selectedYearChanged(year: number): void {
    this.store.setSelectedYear(year);
  }

  private loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
      this.availableYears.push(year);
    }
  }
}
