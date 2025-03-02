import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { environment } from '../environments/environment';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl: string = environment.baseUrl;
  const spinner = inject(NgxSpinnerService)
  const excludedUrls = [`${baseUrl}/api/v1/auth/signup`, `${baseUrl}/api/v1/auth/signin`, `${baseUrl}/api/v1/auth/forgotPasswords`, `${baseUrl}/api/v1/auth/verifyResetCode`, `${baseUrl}/api/v1/auth/resetPassword`];
  const isExcluded = excludedUrls.some(url => req.url === url);
  if (!isExcluded) {
    spinner.show()
  }
  return next(req).pipe(finalize(() => spinner.hide()))
};
