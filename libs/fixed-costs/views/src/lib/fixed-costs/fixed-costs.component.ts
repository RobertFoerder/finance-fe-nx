import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { FixedCostsFacade } from '@finance-fe-nx/fixed-costs/data';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { map, Observable } from 'rxjs';

interface FixedCostsPerCategory {
  category: string | undefined;
  fixedCosts: FixedCost[];
}

@Component({
  templateUrl: './fixed-costs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedCostsComponent extends ContainerComponent implements OnInit {
  public total = 0;

  public fixedCostsGroupedByCategory$: Observable<FixedCostsPerCategory[]> =
    this.facade.collection$.pipe(
      map((fixedCosts) => this.groupFixedCostsByCategory(fixedCosts))
    );

  constructor(
    public readonly facade: FixedCostsFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmBox: ConfirmBoxEvokeService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.init();
  }

  public addFixedCost(category?: string): void {
    let queryParams = null;
    if (category) {
      queryParams = { category };
    }
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }

  public deleteFixedCost(
    id: string | undefined,
    description: string | undefined
  ): void {
    this.confirmBox
      .danger(
        'Delete fixed cost',
        `Should fixed cost "${description}" really be deleted?`,
        'Yes',
        'Cancel'
      )
      .subscribe((resp) => {
        if (resp.success) {
          this.facade.deleteFixedCost(id);
        }
      });
  }

  public editFixedCost(id: string | undefined): void {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  private groupFixedCostsByCategory(
    fixedCosts: FixedCost[]
  ): FixedCostsPerCategory[] {
    const groupedFixedCosts: FixedCostsPerCategory[] = [];

    if (!fixedCosts) {
      return groupedFixedCosts;
    }

    for (const fixedCost of fixedCosts) {
      if (groupedFixedCosts.some((e) => e.category === fixedCost.category)) {
        continue;
      }

      const fixedCostsPerCategory: FixedCost[] = fixedCosts
        .filter((e) => e.category === fixedCost.category)
        .sort((e1, e2) => {
          if (!e1.description || !e2.description) {
            return 0;
          }
          return e1.description.localeCompare(e2.description.toString());
        });

      groupedFixedCosts.push({
        category: fixedCost.category,
        fixedCosts: fixedCostsPerCategory,
      });
    }

    return groupedFixedCosts.sort((e1, e2) => {
      if (!e1.category || !e2.category) {
        return 0;
      }
      return e1.category.localeCompare(e2.category);
    });
  }
}
