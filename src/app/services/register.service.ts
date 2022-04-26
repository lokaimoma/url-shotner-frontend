import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../types/request';
import { User, UserNameTakenResponse } from '../types/response';
import { AuthStorageService } from './auth-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private httpClient: HttpClient,
    private authStorageService: AuthStorageService,
    private authService: AuthService
  ) {}

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
        .post<User>(`${environment.API_URL}/api/register/`, u)
        .subscribe({
          next: (data) => {
            this.authStorageService.saveUserInfo(data);
            this.authService
              .getTokens(u.username, u.password)
              .then((successful) => {
                if (successful) {
                  resolve(true);
                } else {
                  reject(new Error('Error fetching auth tokens'));
                }
              })
              .catch((err) => reject(err));
          },
          error: (err) => reject(err),
        });
    });
  }
}
