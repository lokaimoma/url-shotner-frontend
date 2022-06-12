import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_STATUS } from '../types/enum';
import { Result, URL } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class UrlBoardService {
  constructor(private client: HttpClient) {}

  fetchUrls(): Promise<Result<URL>> {
    return new Promise<Result<URL>>((resolve, reject) => {
      this.client
        .get<Result<URL>>(`${environment.API_URL}/api/urls/`)
        .pipe(first())
        .subscribe({
          next: (d) => resolve(d),
          error: (err: HttpErrorResponse) => reject(err.message),
        });
    });
  }

  shortenUrl(longUrl: string): Promise<URL> {
    return new Promise<URL>((resolve, reject) => {
      this.client
        .post<URL>(`${environment.API_URL}/api/urls/`, { long_url: longUrl })
        .pipe(first())
        .subscribe({
          next: (d) => resolve(d),
          error: (e) => reject(e),
        });
    });
  }

  toggleUrlStatus(value: boolean, url_code: string) {
    return new Promise<URL>((resolve, reject) => {
      this.client
        .patch<URL>(`${environment.API_URL}/api/urls/${url_code}/`, {
          status: value ? URL_STATUS.ACTIVE : URL_STATUS.OFFLINE,
        })
        .pipe(first())
        .subscribe({
          next: (v) => resolve(v),
          error: (err) => reject(err),
        });
    });
  }
}
