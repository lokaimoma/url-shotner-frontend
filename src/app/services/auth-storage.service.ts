import { Injectable } from '@angular/core';
import { getDaysDelta } from 'src/utils';
import { User } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}
  private ACCESSTOKEN_KEY = 'tk';
  private REFRESHTOKEN_KEY = 'rtk';
  private TOKEN_INSERT_DATE_KEY = 'tkdt';
  private USER_INFO_KEY = 'uinfo';

  saveTokens(access: string, refresh: string) {
    window.localStorage.setItem(this.ACCESSTOKEN_KEY, access);
    window.localStorage.setItem(this.REFRESHTOKEN_KEY, refresh);
    window.localStorage.setItem(
      this.TOKEN_INSERT_DATE_KEY,
      new Date().toString()
    );
  }

  updateAccessToken(access: string) {
    window.localStorage.setItem(this.ACCESSTOKEN_KEY, access);
  }

  saveUserInfo(u: User) {
    window.localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(u));
  }

  getAccessToken(): string | null {
    return window.localStorage.getItem(this.ACCESSTOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return window.localStorage.getItem(this.REFRESHTOKEN_KEY);
  }

  getUserInfo(): User | null {
    const d = JSON.parse(
      window.localStorage.getItem(this.USER_INFO_KEY) ?? '{}'
    );
    if (Object.keys(d).length <= 0) return null;
    return d;
  }

  isTokenOld(): boolean {
    const dateInserted = window.localStorage.getItem(
      this.TOKEN_INSERT_DATE_KEY
    );
    if (dateInserted === null) return true;
    if (dateInserted.trim() === '') return true;
    const days = getDaysDelta(Date.parse(dateInserted), Date.now());
    if (days >= 1) return true;
    return false;
  }

  clearStorage() {
    window.localStorage.clear();
  }
}
