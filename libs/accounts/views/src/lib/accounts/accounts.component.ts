import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
    templateUrl: './accounts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, CurrencyPipe]
})
export class AccountsComponent extends ContainerComponent implements OnInit {
  public readonly facade = inject(AccountsFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly confirmBox = inject(ConfirmBoxEvokeService);

  public total = 0;

  public ngOnInit(): void {
    this.subscribeTo(this.facade.total$, (total) => {
      if (total) {
        this.total = total;
      }
    });

    this.facade.init();
  }

  public addAccount(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }

  public deleteAccount(
    id: string | undefined,
    accountName: string | undefined
  ): void {
    this.confirmBox
      .danger(
        'Delete account',
        `Should account "${accountName}" really be deleted?`,
        'Yes',
        'Cancel'
      )
      .subscribe((resp) => {
        if (resp.success) {
          this.facade.deleteAccount(id);
        }
      });
  }

  public editAccount(id: string | undefined): void {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }
}
