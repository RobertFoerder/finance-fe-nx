import { Component } from '@angular/core';
import { AppUpdateService } from '@finance-fe-nx/shared';

@Component({
  selector: 'finance-fe-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private readonly updateService: AppUpdateService) {}
}
