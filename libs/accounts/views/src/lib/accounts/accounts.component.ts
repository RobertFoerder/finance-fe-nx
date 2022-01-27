import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent extends ContainerComponent implements OnInit {
  public total = 0;

  constructor(
    public readonly facade: AccountsFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
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
}
