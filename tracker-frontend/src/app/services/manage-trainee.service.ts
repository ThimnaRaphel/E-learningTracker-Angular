import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Trainee {
  trainee_id: number;
  user_id: number;
  batch_id: number;
  batch: {
      batch_name: string;
  };
  user: {
      user_name: string;
  };
}

const baseUrl = 'http://localhost:5432/api/';
// const getTraineesUrl = '';

@Injectable({
  providedIn: 'root'
})

export class ManageTraineeService {

  constructor(private http : HttpClient) {

  }

  getTrainees(token: string): Observable<Trainee[]> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<Trainee[]>(baseUrl + 'v2/trainee', { headers: headers });
  }
  
    deactivateTrainee(user_id : string, user_name : string, status : any, token : string) : Observable<any> {
      const body = {user_id, user_name, status};
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
      });
      return this.http.patch<any>(baseUrl + 'v2/trainee', body, {
        headers,
      });
    }
}