import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('userToken')) {
    const userToken = localStorage.getItem('userToken') as string
    req = req.clone({
      setHeaders: {
        token: userToken
      }
    })
  }
  return next(req)
};
