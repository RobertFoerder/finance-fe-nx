import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@finance-fe-nx/shared';

@Component({
    selector: 'finance-fe-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class LayoutComponent {
  public expanded = false;
  public version = environment.appVersion;
}
