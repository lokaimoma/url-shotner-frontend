import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { RegisterService } from 'src/app/services/register.service';
import { RegisterScreenState } from 'src/app/states/screen';
import { RegisterUser } from 'src/app/types/request';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'linksly-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  state: RegisterScreenState;

  constructor(
    fb: FormBuilder,
    private rs: RegisterService,
    private router: Router
  ) {
    this.state = new RegisterScreenState(fb);
  }

  onSubmit() {
    if (!this.state.showUserNameTakenError) {
      this.state.showRegistrationError = false;
      this.state.showPleaseWait = true;
      setTimeout(
        () => {
          const payload: RegisterUser = {
            first_name: this.state.form.controls['fname'].value,
            last_name: this.state.form.controls['lname'].value,
            email: this.state.form.controls['email'].value,
            password: this.state.form.controls['pwd'].value,
            username: this.state.form.controls['uname'].value,
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
    this.state.form.controls['uname'].valueChanges
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
