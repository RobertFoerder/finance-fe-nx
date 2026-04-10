import { Component, inject } from '@angular/core';
import { AppUpdateService } from '@finance-fe-nx/shared';

@Component({
    selector: 'finance-fe-root',
    templateUrl: './app.component.html',
    standalone: false,
})
export class AppComponent {
  private readonly updateService = inject(AppUpdateService);
}
