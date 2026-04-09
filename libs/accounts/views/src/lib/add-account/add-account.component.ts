import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ContainerComponent } from '@finance-fe-nx/core';
import { Account } from '@finance-fe-nx/finance-api';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './add-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AddAccountComponent extends ContainerComponent implements OnInit {
  public account: Account = {
    name: '',
  };

  constructor(
    public readonly facade: AccountsFacade,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.resetAdd();
    this.subscribeTo(this.facade.addError$, (error) => {
      if (error) {
        this.toastr.error('Error adding account');
      }
    });
    this.subscribeTo(this.facade.added$, (added) => {
      if (added) {
        this.router.navigate(['/accounts']);
      }
    });
  }
}
