import { Component } from '@angular/core';
import { environment } from '@finance-fe-nx/shared';

@Component({
    selector: 'finance-fe-layout',
    templateUrl: './layout.component.html',
    standalone: false
})
export class LayoutComponent {
  public expanded = false;
  public version = environment.appVersion;
}
