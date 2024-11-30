import { CanActivateFn, Router } from '@angular/router';
import { SwalMessages } from '../shared/swal-messages';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  let swal: SwalMessages = new SwalMessages();
  
  if(localStorage.getItem("user")){
    
    return true;
  }

  inject(Router).navigate(['/']);
  swal.errorMessage("No tienes los permisos para acceder a esta página");
  return false;
};
