import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { FixedCostsStore } from '@finance-fe-nx/fixed-costs/data';
import { ValueInputComponent } from '@finance-fe-nx/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-fixed-cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ValueInputComponent],
})
export class AddFixedCostComponent {
  readonly store = inject(FixedCostsStore);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public fixedCost: FixedCost = {
    category: '',
    description: '',
    value: 0,
  };

  constructor() {
    this.store.resetAdd();
    effect(() => {
      if (this.store.addError()) {
        this.toastr.error('Error adding fixed cost');
      }
    });
    effect(() => {
      if (this.store.added()) {
        this.router.navigate(['/fixed-costs']);
      }
    });
  }
}
