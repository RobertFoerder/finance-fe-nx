import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent extends ContainerComponent implements OnInit {
  public total = 0;

  constructor(
    public readonly facade: AccountsFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmBox: ConfirmBoxEvokeService
  ) {
    super();
  }

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
