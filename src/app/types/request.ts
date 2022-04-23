import { RegisterUserResponse } from './response';

type RegisterUser = RegisterUserResponse & { password: string };

type TokensResponse = {
    access: string,
    refresh: string
}

export { RegisterUser, TokensResponse };
