import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsStore } from '@finance-fe-nx/accounts/data';
import { Account } from '@finance-fe-nx/finance-api';
import { ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './edit-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ValueInputComponent],
})
export class EditAccountComponent {
  readonly store = inject(AccountsStore);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly accountId = this.activatedRoute.snapshot.params.accountId;

  private readonly entity = computed(() =>
    this.store.entities().find((a) => a.id === this.accountId),
  );

  public account: Account | undefined = undefined;
  public initialValue = 0;

  constructor() {
    this.store.init();
    this.store.resetEdit();

    effect(() => {
      if (this.store.editError()) {
        this.toastr.error('Error editing account');
      }
    });
    effect(() => {
      if (this.store.edited()) {
        this.router.navigate(['/accounts']);
      }
    });
    effect(() => {
      const entity = this.entity();
      if (entity && !this.account) {
        this.account = { ...entity };
        this.initialValue = this.account.value ?? 0;
      }
    });
  }

  public saveAccount(): void {
    if (this.account?.id) {
      this.store.editAccount({ id: this.account.id, account: this.account });
    }
  }
}
