import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserNameTakenResponse } from '../types/response';

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
}
