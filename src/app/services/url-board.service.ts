import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
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
        .subscribe({
          next: (d) => resolve(d),
          error: (e) => reject(e),
        });
    });
  }
}
