import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Injectable()
export class AppUpdateService {
  private updating = false;

  constructor(
    private readonly updates: SwUpdate,
    private readonly confirmBox: ConfirmBoxEvokeService
  ) {
    this.updates.versionUpdates.subscribe(() => {
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
          this.doAppUpdate();
        }
      });
  }

  private doAppUpdate(): void {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
