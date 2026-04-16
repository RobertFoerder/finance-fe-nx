import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { MonthToDatePipe, ValueInputComponent } from '@finance-fe-nx/shared';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './edit-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, FormsModule, MonthToDatePipe, ValueInputComponent],
})
export class EditEntryComponent {
  readonly store = inject(FinanceEntriesStore);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly entryId = this.activatedRoute.snapshot.params.entryId;

  private readonly entity = computed(() =>
    this.store.entities().find((e) => e.id === this.entryId),
  );

  public entry: FinanceEntry | undefined = undefined;
  public initialValue = 0;

  constructor() {
    this.store.init();
    this.store.resetEdit();

    effect(() => {
      if (this.store.editError()) {
        this.toastr.error('Error editing entry');
      }
    });
    effect(() => {
      if (this.store.edited()) {
        this.router.navigate(['/summary']);
      }
    });
    effect(() => {
      const entity = this.entity();
      if (entity && !this.entry) {
        this.entry = { ...entity };
        this.initialValue = this.entry.value ?? 0;
      }
    });
  }

  public saveEntry(): void {
    if (this.entry?.id) {
      this.store.editEntry({ id: this.entry.id, entry: this.entry });
    }
  }
}
