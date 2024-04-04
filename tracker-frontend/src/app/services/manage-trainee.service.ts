import { HttpClient } from '@angular/common/http';
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

const baseUrl = 'http://localhost:5432/api/v2/trainee';

@Injectable({
  providedIn: 'root'
})

export class ManageTraineeService {

  constructor(private http : HttpClient) {

  }

  getTrainees() : Observable<Trainee[]> {
    return this.http.get<Trainee[]>(baseUrl);
  }
  
}