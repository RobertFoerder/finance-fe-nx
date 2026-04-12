import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@finance-fe-nx/layout';
import { AppUpdateService } from '@finance-fe-nx/shared';

@Component({
    selector: 'finance-fe-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [LayoutComponent, RouterOutlet],
})
export class AppComponent {
  private readonly updateService = inject(AppUpdateService);
}
