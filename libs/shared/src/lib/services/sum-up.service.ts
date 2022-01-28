import { Injectable } from '@angular/core';
import { Account, FinanceEntry } from '@finance-fe-nx/finance-api';

@Injectable()
export class SumUpService {
  public financeEntries(entries: FinanceEntry[]): number | undefined {
    if (!entries || entries.length === 0) {
      return 0;
    }

    return entries
      .map((entry) => entry.value)
      .reduce((a, b) => {
        if (!a || !b) {
          return 0;
        }

        return a + b;
      });
  }

  public accounts(accounts: Account[]): number | undefined {
    if (!accounts || accounts.length === 0) {
      return 0;
    }

    return accounts
      .map((account) => account.value)
      .reduce((a, b) => {
        if (!a || !b) {
          return 0;
        }

        return a + b;
      });
  }
}
