import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsFacade } from '@finance-fe-nx/accounts/data';
import { ContainerComponent } from '@finance-fe-nx/core';
import { Account } from '@finance-fe-nx/finance-api';
import { ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap, takeWhile, tap } from 'rxjs';

@Component({
    templateUrl: './edit-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, FormsModule, ValueInputComponent]
})
export class EditAccountComponent extends ContainerComponent implements OnInit {
  public readonly facade = inject(AccountsFacade);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  public account: Account | undefined = undefined;
  public loading = true;
  public initialValue = 0;

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
      this.account = { ...account };
      if (this.account) {
        this.initialValue = this.account.value ?? 0;
      }
      this.cdr.detectChanges();
    });
  }
}
