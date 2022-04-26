import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokensResponse } from '../types/request';
import { LoginResponse, ResfreshTokenResponse } from '../types/response';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private authStorageService: AuthStorageService
  ) {}

  getTokens(username: string, password: string) {
    return new Promise<boolean>((resolve, _) => {
      this.httpClient
        .post<TokensResponse>(`${environment.API_URL}/api/token/`, {
          username,
          password,
        })
        .subscribe({
          next: (d) => {
            this.authStorageService.saveTokens(d.access, d.refresh);
            resolve(true);
          },
          error: (err) => resolve(false),
        });
    });
  }

  login(username: string, password: string) {
    this.authStorageService.clearStorage();
    return new Promise<boolean>((resolve, _) => {
      this.httpClient
        .post<LoginResponse>(`${environment.API_URL}/api/login/`, {
          username,
          password,
        })
        .subscribe({
          next: (d) => {
            this.authStorageService.saveTokens(d.access, d.refresh);
            this.authStorageService.saveUserInfo({
              first_name: d.firstName,
              last_name: d.lastName,
              email: d.email,
              username: d.username,
            });
            resolve(true);
          },
          error: (_) => resolve(false),
        });
    });
  }

  refreshToken() {
    const refresh = this.authStorageService.getRefreshToken();
    return this.httpClient.post<ResfreshTokenResponse>(
      `${environment.API_URL}/api/token/refresh`,
      { refresh }
    );
  }
}
