import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsStore } from '@finance-fe-nx/accounts/data';
import { Account } from '@finance-fe-nx/finance-api';
import { ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ValueInputComponent],
})
export class AddAccountComponent {
  readonly store = inject(AccountsStore);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public account: Account = {
    name: '',
  };

  constructor() {
    this.store.resetAdd();
    effect(() => {
      if (this.store.addError()) {
        this.toastr.error('Error adding account');
      }
    });
    effect(() => {
      if (this.store.added()) {
        this.router.navigate(['/accounts']);
      }
    });
  }
}
