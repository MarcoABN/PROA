import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UppercaseDirective),
    multi: true
  }]
})
export class UppercaseDirective implements ControlValueAccessor {
  private onChange: any;
  private onTouched: any;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: any): void {
    const upper = value ? value.toUpperCase() : '';
    this.el.nativeElement.value = upper;
  }

  registerOnChange(fn: any): void {
    this.onChange = (value: any) => fn(value ? value.toUpperCase() : value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const upper = value.toUpperCase();
    this.el.nativeElement.value = upper;
    if (this.onChange) {
      this.onChange(upper);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
