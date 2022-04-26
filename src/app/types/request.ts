import { User } from "./response";

type RegisterUser = User & { password: string };

type TokensResponse = {
    access: string,
    refresh: string
}

export { RegisterUser, TokensResponse };
