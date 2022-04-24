import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { RegisterService } from 'src/app/services/register.service';
import { RegisterScreenState } from 'src/app/states/screen';
import { RegisterUser } from 'src/app/types/request';
import { environment } from 'src/environments/environment';
import { ConfirmedValidator } from './validators';

@Component({
  selector: 'linksly-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private rs: RegisterService,
    private router: Router
  ) {}

  state = new RegisterScreenState();

  form = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      uname: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
      confPwd: ['', [Validators.required]],
    },
    { validators: ConfirmedValidator('pwd', 'confPwd') }
  );

  onSubmit() {
    if (!this.state.showUserNameTakenError) {
      this.state.showRegistrationError = false;
      this.state.showPleaseWait = true;
      setTimeout(
        () => {
          const payload: RegisterUser = {
            first_name: this.form.controls['fname'].value,
            last_name: this.form.controls['lname'].value,
            email: this.form.controls['email'].value,
            password: this.form.controls['pwd'].value,
            username: this.form.controls['uname'].value,
          };
          this.rs
            .registerUser(payload)
            .then((_) => {
              this.router.navigateByUrl('/app');
            })
            .catch((err) => {
              this.state.showRegistrationError = true;
              this.state.showPleaseWait = false;
            });
        },
        environment.production ? 0 : 3000
      );
    }
  }

  ngAfterViewInit(): void {
    this.form.controls['uname'].valueChanges
      .pipe(
        filter((v) => v != ''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (v) => {
          this.rs.checkUserNameExists(v).then((isTaken) => {
            this.state.showUserNameTakenError = isTaken;
          });
        },
      });
  }
}
