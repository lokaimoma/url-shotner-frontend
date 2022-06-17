import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const f = control.get(controlName);
    const matchF = control.get(matchingControlName);

    return f && matchF && f.value === matchF.value ? null : { NotEqual: true };
  };
}

export function IsUrl(
  control: AbstractControl
): Promise<ValidationErrors | null> {
  return new Promise((resolve, _) => {
    try {
      new URL(control.value);
      if (control.value.indexOf(environment.API_URL) > -1) {
        resolve({ invalid: true });
        return;
      }
    } catch (e) {
      resolve({ invalid: true });
    }
    resolve(null);
  });
}
