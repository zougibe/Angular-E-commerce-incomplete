import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService)
  let router = inject(Router)
  if (_Auth.userData !== null) {
    console.log(_Auth.userData, 'success');

    return true
  }
  router.navigate(['/login'])
  console.log(_Auth.userData, 'fail');

  return false;
};
