import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ContainerComponent } from '@finance-fe-nx/core';
import { Account } from '@finance-fe-nx/finance-api';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  templateUrl: './edit-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountComponent extends ContainerComponent implements OnInit {
  public account: Account | undefined = undefined;
  public loading = true;
  public initialValue = 0;

  constructor(
    public readonly facade: AccountsFacade,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.init();
    this.facade.resetEdit();
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

    const accountId = this.activatedRoute.snapshot.params.accountId;

    const getAccountById: Observable<Account | undefined> =
      this.facade.loaded$.pipe(
        takeWhile(() => this.loading),
        tap((loaded) => (this.loading = !loaded)),
        switchMap(() => this.facade.collection$),
        map((accounts) => accounts.find((account) => account.id === accountId))
      );

    this.subscribeTo(getAccountById, (account) => {
      this.account = account;
      if (this.account) {
        this.initialValue = this.account.value ?? 0;
      }
      this.cdr.detectChanges();
    });
  }
}
