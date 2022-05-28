import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsUrl } from '../components/register/validators';
import { URL } from '../types/response';

class RegisterScreenState {
  showUserNameTakenError: boolean = false;
  showRegistrationError: boolean = false;
  showPleaseWait: boolean = false;
}

class LoginScreenState {
  showPleaseWait: boolean = false;
  showLoginError: boolean = false;
}

class MainScreenState {
  username: string = '';
}

class URLBoardState {
  urls: URL[] | null = null;
  fetchUrlsError: string | null = null;
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
