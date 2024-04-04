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

  getTrainees() : Observable<Trainee[]> {
    return this.http.get<Trainee[]>(baseUrl + 'v2/trainee');
  }
  
    deactivateTrainee(user_id : string, user_name : string, status : any) : Observable<any> {
      const body = {user_id, user_name, status};
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.patch<any>(baseUrl + 'v2/trainee', body, {
        headers,
      });
    }
}