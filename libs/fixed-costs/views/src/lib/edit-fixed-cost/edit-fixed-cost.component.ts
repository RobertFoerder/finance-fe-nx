import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { FixedCostsFacade } from '@finance-fe-nx/fixed-costs/data';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  templateUrl: './edit-fixed-cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFixedCostComponent
  extends ContainerComponent
  implements OnInit
{
  public fixedCost: FixedCost | undefined = undefined;
  public loading = true;
  public initialValue = 0;

  constructor(
    public readonly facade: FixedCostsFacade,
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
        this.toastr.error('Error adding fixed cost');
      }
    });
    this.subscribeTo(this.facade.edited$, (edited) => {
      if (edited) {
        this.router.navigate(['/fixed-costs']);
      }
    });

    const fixedCostId = this.activatedRoute.snapshot.params.fixedCostId;

    const getFixedCostById: Observable<FixedCost | undefined> =
      this.facade.loaded$.pipe(
        takeWhile(() => this.loading),
        tap((loaded) => (this.loading = !loaded)),
        switchMap(() => this.facade.collection$),
        map((fixedCosts) =>
          fixedCosts.find((fixedCost) => fixedCost.id === fixedCostId)
        )
      );

    this.subscribeTo(getFixedCostById, (fixedCost) => {
      this.fixedCost = fixedCost;
      if (this.fixedCost) {
        this.initialValue = this.fixedCost.value ?? 0;
      }
      this.cdr.detectChanges();
    });
  }
}
