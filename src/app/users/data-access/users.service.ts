import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(searchedName: string) {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const params:any = {};
    if(searchedName) {
      params["name"] = searchedName;
    }
    return this.httpClient.get<User[]>(url,{params});
  }
}
