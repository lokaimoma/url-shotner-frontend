import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromptData } from '../components/prompt/prompt.component';
import { ConfirmedValidator, IsUrl } from '../components/register/validators';
import { Event } from '../components/reusables/event-notifier/event-notifier.component';
import { AuthStorageService } from '../services/auth-storage.service';
import { DashBoardData, URL, User } from '../types/response';

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

class UpdateUserInfoState {
  showUserNameAlreadyTaken: boolean = false;
  form: FormGroup;
  userinfo: User;
  events: Event[] = [];

  constructor(fb: FormBuilder, authStorageService: AuthStorageService) {
    const userinfo = authStorageService.getUserInfo();
    this.form = fb.group({
      username: [userinfo?.username, Validators.required],
      fname: [userinfo?.first_name, Validators.required],
      lname: [userinfo?.last_name, Validators.required],
    });
    this.userinfo = userinfo as User;
  }
}

export {
  RegisterScreenState,
  LoginScreenState,
  MainScreenState,
  URLBoardState,
  DashBoardState,
  UpdateUserInfoState,
};
