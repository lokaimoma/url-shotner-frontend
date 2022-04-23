import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../types/request';
import { RegisterUserResponse, UserNameTakenResponse } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  checkUserNameExists(v: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get<UserNameTakenResponse>(
          `${environment.API_URL}/api/check-username-exists?username=${v}`
        )
        .subscribe({
          next: (data) => resolve(data.taken),
          error: (_) => reject(),
        });
    });
  }

  registerUser(u: RegisterUser) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .post<RegisterUserResponse>(`${environment.API_URL}/api/register/`, u)
        .subscribe({
          next: (data) => {
            resolve(true);
          },
          error: (err) => reject(),
        });
    });
  }
}
