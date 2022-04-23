type UserNameTakenResponse = {
  taken: boolean;
};

type RegisterUserResponse = {
  username: string,
  first_name: string,
  last_name: string,
  email: string
}

export { UserNameTakenResponse, RegisterUserResponse };
