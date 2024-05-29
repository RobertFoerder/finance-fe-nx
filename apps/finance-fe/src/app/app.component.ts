import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from '@finance-fe-nx/layout';
import { AppUpdateService } from '@finance-fe-nx/shared';

@Component({
  selector: 'finance-fe-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [LayoutModule, RouterOutlet],
})
export class AppComponent {
  constructor(private readonly updateService: AppUpdateService) {}
}
