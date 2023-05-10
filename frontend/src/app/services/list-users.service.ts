import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomerList(search = '',page = 0,limit = 10) {
    
    let params = new HttpParams();

    params = params.append('search', search);
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString())
    return this.http.get(this.apiUrl + '/users/list', { params });

  }

}
