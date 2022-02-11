import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { FinanceConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountsService } from './api/accounts.service';
import { EntriesService } from './api/entries.service';
import { FixedCostsService } from './api/fixed-costs.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class FinanceApiModule {
    public static forRoot(configurationFactory: () => FinanceConfiguration): ModuleWithProviders<FinanceApiModule> {
        return {
            ngModule: FinanceApiModule,
            providers: [ { provide: FinanceConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: FinanceApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('FinanceApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
