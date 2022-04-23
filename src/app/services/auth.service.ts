import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokensResponse } from '../types/request';
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
}
