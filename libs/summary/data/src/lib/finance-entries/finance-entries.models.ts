import { FinanceEntry } from '@finance-fe-nx/finance-api';

export type FinanceEntryEntity = FinanceEntry;

export interface EntriesPerCategory {
  category: string | undefined;
  entries: FinanceEntry[];
}
