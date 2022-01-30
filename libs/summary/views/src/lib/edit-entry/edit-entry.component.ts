import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  templateUrl: './edit-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEntryComponent extends ContainerComponent implements OnInit {
  public entry: FinanceEntry | undefined = undefined;
  public loading = true;
  public initialValue = 0;

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.init();
    this.facade.resetEdit();
    this.subscribeTo(this.facade.editError$, (error) => {
      if (error) {
        this.toastr.error('Error editing entry');
      }
    });
    this.subscribeTo(this.facade.edited$, (edited) => {
      if (edited) {
        this.router.navigate(['/summary']);
      }
    });

    const entryId = this.activatedRoute.snapshot.params.entryId;

    const getEntryById: Observable<FinanceEntry | undefined> =
      this.facade.loaded$.pipe(
        takeWhile(() => this.loading),
        tap((loaded) => (this.loading = !loaded)),
        switchMap(() => this.facade.collection$),
        map((entries) => entries.find((entry) => entry.id === entryId))
      );

    this.subscribeTo(getEntryById, (entry) => {
      this.entry = entry;
      if (this.entry) {
        this.initialValue = this.entry.value ?? 0;
      }
      this.cdr.detectChanges();
    });
  }
}
