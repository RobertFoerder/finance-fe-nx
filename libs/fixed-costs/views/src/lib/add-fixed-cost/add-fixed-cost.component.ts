import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { FixedCostsFacade } from '@finance-fe-nx/fixed-costs/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-fixed-cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFixedCostComponent
  extends ContainerComponent
  implements OnInit
{
  public fixedCost: FixedCost = {
    category: '',
    description: '',
    value: 0,
  };

  constructor(
    public readonly facade: FixedCostsFacade,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.resetAdd();
    this.subscribeTo(this.facade.addError$, (error) => {
      if (error) {
        this.toastr.error('Error adding fixed cost');
      }
    });
    this.subscribeTo(this.facade.added$, (added) => {
      if (added) {
        this.router.navigate(['/fixed-costs']);
      }
    });
  }
}
