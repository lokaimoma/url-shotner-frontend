import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const f = control.get(controlName);
    const matchF = control.get(matchingControlName);

    return f && matchF && f.value === matchF.value
      ? null
      : { NotEqual: true };
  };
}
