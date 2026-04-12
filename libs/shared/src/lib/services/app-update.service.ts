import { inject, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly updates = inject(SwUpdate);
  private readonly confirmBox = inject(ConfirmBoxEvokeService);

  private updating = false;

  constructor() {
    this.updates.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        if (!this.updating) {
          this.updating = true;
          this.showAppUpdateAlert();
        }
      });
  }

  public showAppUpdateAlert(): void {
    this.confirmBox
      .info('Update available', 'Update now?', 'Yes', 'No')
      .subscribe((resp) => {
        this.updating = false;
        if (resp) {
          document.location.reload();
        }
      });
  }
}
