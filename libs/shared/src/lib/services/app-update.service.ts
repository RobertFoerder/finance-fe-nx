import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class AppUpdateService {
  private updating = false;

  constructor(
    private readonly updates: SwUpdate,
    private readonly confirmBox: ConfirmBoxEvokeService
  ) {
    updates.versionUpdates
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
