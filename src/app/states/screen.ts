import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator, IsUrl } from '../components/register/validators';
import { URL } from '../types/response';

class RegisterScreenState {
  showUserNameTakenError: boolean = false;
  showRegistrationError: boolean = false;
  showPleaseWait: boolean = false;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group(
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
  }
}

class LoginScreenState {
  showPleaseWait: boolean = false;
  showLoginError: boolean = false;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      uname: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }
}

class MainScreenState {
  username: string = '';
}

class URLBoardState {
  urls: URL[] | null = null;
  fetchUrlsError: boolean = false;
  processingRequest: boolean = false;
  requestError: boolean = false;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      url: ['', Validators.required, IsUrl],
    });
  }
}

export {
  RegisterScreenState,
  LoginScreenState,
  MainScreenState,
  URLBoardState,
};
