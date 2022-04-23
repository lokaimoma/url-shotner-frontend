import { RegisterUserResponse } from './response';

type RegisterUser = RegisterUserResponse & { password: string };

export { RegisterUser };
