import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthStorageService } from './services/auth-storage.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private authStorage: AuthStorageService,
    private authService: AuthService
  ) {}

  private isRefreshing: boolean = false;
  private rtkSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;
    const tk = this.authStorage.getAccessToken();
    if (tk !== null) {
      req = this.addAuthorizationHeader(req, tk);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !req.url.includes('api/token/') &&
          !req.url.includes('api/register/') &&
          err.status === 401
        ) {
          return this.handleUnAuthroized(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handleUnAuthroized(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.rtkSubject.next(null);
      this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;
          this.authStorage.updateAccessToken(res.access);
          this.rtkSubject.next(res.access);
          return next.handle(this.addAuthorizationHeader(request, res.access));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authStorage.clearStorage();
          return throwError(() => err);
        })
      );
    }
    return this.rtkSubject.pipe(
      filter((v) => v !== null),
      take(1),
      switchMap((v) => next.handle(this.addAuthorizationHeader(request, v!)))
    );
  }

  private addAuthorizationHeader(
    req: HttpRequest<unknown>,
    tk: string
  ): HttpRequest<unknown> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tk}`),
    });
  }
}
