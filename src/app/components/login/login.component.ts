import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginScreenState } from 'src/app/states/screen';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'linksly-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  state = new LoginScreenState();
  form = this.fb.group({
    uname: ['', [Validators.required]],
    pwd: ['', [Validators.required]],
  });

  onSubmit() {
    this.state.showLoginError = false;
    this.state.showPleaseWait = true;
    setTimeout(() => {}, environment.production ? 0 : 3000);
  }
}
