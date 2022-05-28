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

type Result<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type URL = {
  code: string;
  long_url: string;
  date_created: string;
  status: string;
};

export {
  UserNameTakenResponse,
  User,
  ResfreshTokenResponse,
  LoginResponse,
  Result,
  URL
};
