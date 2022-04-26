type UserNameTakenResponse = {
  taken: boolean;
};

type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

type ResfreshTokenResponse = {
  access: string;
};

type LoginResponse = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  access: string;
  refresh: string;
};

export { UserNameTakenResponse, User, ResfreshTokenResponse, LoginResponse };
