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
  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) {}

  state = new LoginScreenState();
  form = this.fb.group({
    uname: ['', [Validators.required]],
    pwd: ['', [Validators.required]],
  });

  onSubmit() {
    this.state.showLoginError = false;
    this.state.showPleaseWait = true;
    setTimeout(
      () => {
        this.as
          .getTokens(
            this.form.controls['uname'].value,
            this.form.controls['pwd'].value
          )
          .then((successfull) => {
            if (successfull) {
              this.router.navigateByUrl('/app');
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
