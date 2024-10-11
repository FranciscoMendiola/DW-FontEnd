import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  // let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lciIsInJvbCI6IlVTRVIiLCJpYXQiOjE3MjgzMTI3NjIsImV4cCI6MTcyODMxODc2Mn0.kblX8vfBDeXINcw6I3LIzpQKmg0-1Mctw4n1k7ZKS-M";

  if(token != null){
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return next(authReq);
  }

  return next(req);
};
