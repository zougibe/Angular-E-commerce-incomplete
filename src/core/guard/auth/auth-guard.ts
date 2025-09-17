import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService)
  let router = inject(Router)
  if (_Auth.userData) {
    return true
  } else {
    router.navigate(['/login'])
    console.log(_Auth.userData, 'fail');
  }

  return false;
};
