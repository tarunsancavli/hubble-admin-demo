import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCustomer( data: any) {
    
    let params = new HttpParams();
    let data1 = JSON.stringify(data); 
    params = params.append('data', data1);

    return this.http.post(this.apiUrl + '/user/create', params);
  }

}
