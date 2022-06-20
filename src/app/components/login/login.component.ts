import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { LoginScreenState } from 'src/app/states/screen';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'linksly-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  state: LoginScreenState;

  constructor(
    fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) {
    this.state = new LoginScreenState(fb);
  }

  onSubmit() {
    this.state.showLoginError = false;
    this.state.showPleaseWait = true;
    setTimeout(
      () => {
        this.as
          .login(
            this.state.form.controls['uname'].value,
            this.state.form.controls['pwd'].value
          )
          .then((successfull) => {
            if (successfull) {
              this.router.navigateByUrl('/app/dashboard');
            } else {
              this.state.showLoginError = true;
              this.state.showPleaseWait = false;
            }
          });
      },
      environment.production ? 0 : 3000
    );
  }
}
