import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { STORAGE } from '../constants/constants.core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
  const authToken: string = localStorage.getItem(STORAGE.TOKEN);
  let request = req;

  if (authToken) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
