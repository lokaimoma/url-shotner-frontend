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
}

export {
  RegisterScreenState,
  LoginScreenState,
  MainScreenState,
  URLBoardState,
};
