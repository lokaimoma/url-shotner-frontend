import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class UserInfoUpdateServiceService {
  constructor(private client: HttpClient) {}

  updateUserInfo(info: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      return this.client
        .patch<User>(`${environment.API_URL}/api/update-user-info/`, {
          username: info.username,
          first_name: info.first_name,
          last_name: info.last_name,
        })
        .subscribe({
          next: (v) => resolve(v),
          error: (_) => reject(),
        });
    });
  }
}
