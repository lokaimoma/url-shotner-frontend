class RegisterScreenState {
  showUserNameTakenError: boolean = false;
  showRegistrationError: boolean = false;
  showPleaseWait: boolean = false;
}

class LoginScreenState {
  showPleaseWait: boolean = false;
  showLoginError: boolean = false;
}

export { RegisterScreenState, LoginScreenState };
