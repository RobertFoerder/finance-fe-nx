import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Injectable()
export class AppUpdateService {
  constructor(
    private readonly updates: SwUpdate,
    private readonly confirmBox: ConfirmBoxEvokeService
  ) {
    this.updates.versionUpdates.subscribe(() => {
      this.showAppUpdateAlert();
    });
  }

  public showAppUpdateAlert(): void {
    this.confirmBox
      .info('Update available', 'Update now?', 'Yes', 'No')
      .subscribe((resp) => {
        if (resp) {
          this.doAppUpdate();
        }
      });
  }

  private doAppUpdate(): void {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
