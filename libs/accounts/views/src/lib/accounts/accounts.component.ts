import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccountsStore } from '@finance-fe-nx/accounts/data';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe],
})
export class AccountsComponent {
  readonly store = inject(AccountsStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly confirmBox = inject(ConfirmBoxEvokeService);

  constructor() {
    this.store.init();
  }

  public addAccount(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }

  public deleteAccount(
    id: string | undefined,
    accountName: string | undefined,
  ): void {
    this.confirmBox
      .danger(
        'Delete account',
        `Should account "${accountName}" really be deleted?`,
        'Yes',
        'Cancel',
      )
      .subscribe((resp) => {
        if (resp.success && id) {
          this.store.deleteAccount(id);
        }
      });
  }

  public editAccount(id: string | undefined): void {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }
}
