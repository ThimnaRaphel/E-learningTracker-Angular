import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5432/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  userSignUp(user:{email : string;password : string;user_name : string; role_id : number; jwt_decoded : string}):  Observable<{token:string;success:boolean;refreshToken:string; user_id : string}>{
    return this.http.post<{token:string;success:boolean;refreshToken:string, user_id : string}>(baseUrl+'v2/admin/registration',user)
  }
    userLogin(user:{email : string;password : string}):  Observable<{token:string;success:boolean;refreshToken:string,status:string}>{
      return this.http.post<{token:string;success:boolean;refreshToken:string,status : string}>(baseUrl+'v1/authentication/login',user)
    }

}
