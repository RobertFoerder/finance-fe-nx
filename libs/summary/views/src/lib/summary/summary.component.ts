import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';

@Component({
  selector: 'finance-fe-summary',
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent extends ContainerComponent {}
