import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromptData } from '../components/prompt/prompt.component';
import { ConfirmedValidator, IsUrl } from '../components/register/validators';
import { Event } from '../components/reusables/event-notifier/event-notifier.component';
import { DashBoardData, URL } from '../types/response';

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
  urls: URL[] | undefined = undefined;
  fetchUrlsError: boolean = false;
  processingRequest: boolean = false;
  requestError: boolean = false;
  form: FormGroup;
  events: Event[] = [];
  prompt: PromptData | null = null;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      url: ['', Validators.required, IsUrl],
    });
  }
}

class DashBoardState {
  loading: boolean = true;
  errorsOccured: boolean = false;
  data: DashBoardData | null = null;
}

export {
  RegisterScreenState,
  LoginScreenState,
  MainScreenState,
  URLBoardState,
  DashBoardState,
};
