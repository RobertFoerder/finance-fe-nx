/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'finance-fe-value-input',
  templateUrl: './value-input.component.html',
  styleUrls: ['./value-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueInputComponent),
      multi: true,
    },
  ],
})
export class ValueInputComponent implements ControlValueAccessor {
  @Input() public income = false;

  @Input() public value: number | undefined;

  private touched = false;

  private onChange = (value: number | undefined) => {};

  private onTouched = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  public onValueChanged(value: number | undefined) {
    this.markAsTouched();
    this.value = value;
    if (value !== undefined) {
      this.onChange(this.income ? value : -value);
    } else {
      this.onChange(undefined);
    }
  }

  public setIncome(income: boolean): void {
    if (this.income !== income) {
      this.income = income;
      this.onValueChanged(this.value);
    }
  }

  public writeValue(value: number | undefined): void {
    this.value = !value || value >= 0 ? value : Math.abs(value);
    this.cdr.detectChanges();
  }

  public registerOnChange(onChange: (value: number | undefined) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
