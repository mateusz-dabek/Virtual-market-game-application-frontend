import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtTokenService } from 'src/app/core/auth/jwt-token.service';
import { User } from 'src/app/user/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private http: HttpClient) {

  }

  static setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  static getEmail(): string {
    return localStorage.getItem('email');
  }

  static removeEmail() {
    localStorage.removeItem('email');
  }


  static setBalance(balance: number) {
    localStorage.setItem('balance', balance.toString());
  }

  static getBalance(): number {
    return +localStorage.getItem('balance');
  }

  static removeBalance() {
    localStorage.removeItem('balance');
  }


  static setFirstName(firstName: string) {
    localStorage.setItem('firstName', firstName);
  }

  static getFirstName(): string {
    return localStorage.getItem('firstName');
  }

  static removeFirstName() {
    localStorage.removeItem('firstName');
  }


  static setLastName(lastName: string) {
    localStorage.setItem('lastName', lastName);
  }

  static getLastName(): string {
    return localStorage.getItem('lastName');
  }

  static removeLastName() {
    localStorage.removeItem('lastName');
  }

  refreshBalaceUser() {
    let id = JwtTokenService.getIdFromToken();
    this.http.get<User>(environment.endpoints.apiPath + environment.endpoints.usersPath + '/' + id)
      .subscribe((data) => {
        UsernameService.setBalance(data.balance)
    })
  }
}
