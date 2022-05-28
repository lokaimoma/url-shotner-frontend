import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class UrlBoardService {
  constructor(private client: HttpClient) {}

  fetchUrls(): Promise<Result<URL>> {
    return new Promise<Result<URL>>((resolve, reject) => {
      this.client
        .get<Result<URL>>(`${environment.API_URL}/urls/`)
        .subscribe({
          next: (d) => resolve(d),
          error: (err: HttpErrorResponse) => reject(err.message),
        });
    });
  }
}
