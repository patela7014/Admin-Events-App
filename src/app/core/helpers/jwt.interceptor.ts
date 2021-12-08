import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.authToken}`
          }
        });
      }

        return next.handle(request);
    }
}
