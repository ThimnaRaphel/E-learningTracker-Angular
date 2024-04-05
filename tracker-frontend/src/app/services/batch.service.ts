import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface BatchDetails{
  batchId : string
  batchName : string,
  startDate :string,
  endDate : string,
  noOfTrainees : string,
  progress : number
}

const baseUrl='http://localhost:5432/api/v2/batch';
const accessToken = localStorage.getItem('access_token');

@Injectable({
  providedIn: 'root'
})


export class BatchService {

  constructor(private http : HttpClient) { }

  getBatches():Observable<BatchDetails[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    
    return this.http.get<BatchDetails[]>(baseUrl,{headers});
  }
}
