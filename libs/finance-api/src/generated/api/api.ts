export * from './accounts.service';
import { AccountsService } from './accounts.service';
export * from './entries.service';
import { EntriesService } from './entries.service';
export * from './fixed-costs.service';
import { FixedCostsService } from './fixed-costs.service';
export const APIS = [AccountsService, EntriesService, FixedCostsService];
