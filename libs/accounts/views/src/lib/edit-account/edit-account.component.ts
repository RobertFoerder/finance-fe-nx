import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ContainerComponent } from '@finance-fe-nx/core';
import { Account } from '@finance-fe-nx/finance-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './edit-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountComponent extends ContainerComponent implements OnInit {
  public account: Account = {};
  public isIncome = true;
  public initialValue = 0;

  constructor(
    public readonly facade: AccountsFacade,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.resetAdd();
    this.subscribeTo(this.facade.editError$, (error) => {
      if (error) {
        this.toastr.error('Error adding account');
      }
    });
    this.subscribeTo(this.facade.edited$, (edited) => {
      if (edited) {
        this.router.navigate(['/accounts']);
      }
    });
  }

  public onSubmit() {
    if (!this.isIncome && this.account.value) {
      this.account.value = -this.account.value;
    }
    this.facade.editAccount(this.account);
  }
}
