import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CanActivateFn, Router } from '@angular/router';
import { platform } from 'os';

export const loggedGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID)
  const router = inject(Router)
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('userToken')) {
      router.navigate(['/home'])
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }

};
