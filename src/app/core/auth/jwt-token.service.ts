import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static getIdFromToken(): number {
    let sub = jwt_decode(JwtTokenService.getToken());
    return sub['sub'];
   
  }

  static getExpirationTime(): Date {
    let exp = jwt_decode(JwtTokenService.getToken());
    return new Date(exp['exp'] * 1000);
  }

}
