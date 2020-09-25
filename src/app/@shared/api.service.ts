import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorage} from 'ngx-webstorage';
import {environment} from '../../environments/environment';
import {User} from "../@model/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPrefix = environment.baseApiPrefix;

  private httpHeaderJson = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  // signIn(model: UserDto): Observable<SessionDto> {
  //   return this.httpClient.post<SessionDto>(this.apiPrefix + '/sign-in', model);
  // }
  //
  // session(): Observable<SessionDto> {
  //   return this.httpClient.get<SessionDto>(this.apiPrefix + '/session',
  //     {headers: new HttpHeaders({'x-access-token': this.sessionUser.id})});
  // }
  //
  // signOut(): void {
  //   this.httpClient.get(this.apiPrefix + '/sign-out',
  //     {headers: new HttpHeaders({'x-token': this.sessionUser.id})})
  //     .subscribe((data: any[]) => {
  //       console.log(data);
  //     });
  //   this.sessionUser = null;
  // }
  //
  // fetchUsers(): Observable<User[]> {
  //   return this.httpClient.get<User[]>(this.apiPrefix + '/users',
  //     {headers: new HttpHeaders({'x-access-token': this.sessionUser.id})});
  // }
  //
  // createUser(item: User): Observable<User> {
  //   return this.httpClient.post<User>(this.apiPrefix + '/users', item,
  //     {headers: new HttpHeaders({'x-access-token': this.sessionUser.id})});
  // }
  //
  // updateUser(item: User): Observable<User> {
  //   return this.httpClient.put<User>(this.apiPrefix + `/users/${item.id}`, item,
  //     {headers: new HttpHeaders({'x-access-token': this.sessionUser.id})});
  // }
  //
  // removeUser(item: User): Observable<User> {
  //   return this.httpClient.delete<User>(this.apiPrefix + `/users/${item.id}`,
  //     {headers: new HttpHeaders({'x-access-token': this.sessionUser.id})});
  // }

}

