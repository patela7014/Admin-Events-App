import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = environment.apiUrl;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(model) {
        return this.http.post<any>(this.baseUrl + `/auth/login`, model)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.authToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.setCurrentUser(user);
                }
                return user;
            }));
    }

    getDecodedToken(token) {
      return JSON.parse(atob(token.split('.')[1]));//atob() function decodes a string of data which has been encoded using Base64 encoding. You can use the btoa() method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the atob() method to decode the data again
    }


    setCurrentUser(user: User) {
        if(user != null){ // for null user should show Auth error
          user.roles = [];
          const isApprover = this.getDecodedToken(user.authToken).IsApprover;
          const isAdmin = this.getDecodedToken(user.authToken).IsAdmin;
          if(isApprover){user.roles.push('Approver');}
          if(isAdmin){user.roles.push('Admin');}

          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }else{
          this.currentUserSubject.next(user);
        }
     }

     getCurrentUser(){
      return this.currentUser;
     }



    forgotPassword(model: any) {
      return this.http.post<any>(this.baseUrl + '/auth/ForgotPassword', model).pipe(
        map((response) => {
          return response;
        })
      )
    }

    resetPassword(model: any) {
      return this.http.post<any>(this.baseUrl + '/auth/ResetPassword', model).pipe(
        map((response) => {

          console.log("response", response)
          if(response){
            return response;
          }
        })
      )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
