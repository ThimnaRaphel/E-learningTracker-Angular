import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface EditBatchDetails{
  batch_id : string
  batch_name : string;
  start_date : string;
  end_date : string
}

const baseUrl='http://localhost:5432/api/v2/';
const accessToken = localStorage.getItem('access_token');


@Injectable({
  providedIn: 'root'
})


export class EditBatchService {

  constructor(private http : HttpClient) { }
  

  updateContact(batchId : string, BatchName : string,startDate : string,endDate : string) : Observable<any> {
    const body = {batchId,BatchName,startDate,endDate};
    console.log('update')
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${accessToken}`
    // });
    return this.http.patch<{status : string}>(baseUrl + 'batch', body);
  }
}
