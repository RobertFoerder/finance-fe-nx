import { Injectable, OnDestroy } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';

type Callback<T> = (data: T) => void;

@Injectable()
export abstract class ContainerComponent implements OnDestroy {
  protected readonly onDestroy$: Subject<void> = new Subject();

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public subscribeTo<T>(obs: Observable<T>, callback: Callback<T>): void {
    obs
      .pipe(takeUntil(this.onDestroy$), distinctUntilChanged())
      .subscribe((data: T) => {
        callback.call(this, data);
      });
  }

  public useLatest<T>(obs: Observable<T>, callback: Callback<T>): void {
    this.subscribeTo(obs.pipe(take(1)), (data: T) => {
      callback.call(this, data);
    });
  }

  public useLatestExisting<T>(obs: Observable<T>, callback: Callback<T>): void {
    this.subscribeTo(this.extractLatestExisting(obs), (data: T) => {
      callback.call(this.subscribeTo, data);
    });
  }

  public async getLatestExisting<T>(
    obs: Observable<T>
  ): Promise<T | undefined> {
    return this.extractLatestExisting(obs).toPromise();
  }

  private extractLatestExisting<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(
      filter((value: T) => Boolean(value)),
      take(1)
    );
  }
}
