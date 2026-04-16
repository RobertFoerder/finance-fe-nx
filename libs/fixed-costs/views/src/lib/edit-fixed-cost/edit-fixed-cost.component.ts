import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { FixedCostsStore } from '@finance-fe-nx/fixed-costs/data';
import { ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './edit-fixed-cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ValueInputComponent],
})
export class EditFixedCostComponent {
  readonly store = inject(FixedCostsStore);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly fixedCostId =
    this.activatedRoute.snapshot.params.fixedCostId;

  private readonly entity = computed(() =>
    this.store.entities().find((fc) => fc.id === this.fixedCostId),
  );

  public fixedCost: FixedCost | undefined = undefined;
  public initialValue = 0;

  constructor() {
    this.store.init();
    this.store.resetEdit();

    effect(() => {
      if (this.store.editError()) {
        this.toastr.error('Error editing fixed cost');
      }
    });
    effect(() => {
      if (this.store.edited()) {
        this.router.navigate(['/fixed-costs']);
      }
    });
    effect(() => {
      const entity = this.entity();
      if (entity && !this.fixedCost) {
        this.fixedCost = { ...entity };
        this.initialValue = this.fixedCost.value ?? 0;
      }
    });
  }

  public saveFixedCost(): void {
    if (this.fixedCost?.id) {
      this.store.editFixedCost({
        id: this.fixedCost.id,
        fixedCost: this.fixedCost,
      });
    }
  }
}
