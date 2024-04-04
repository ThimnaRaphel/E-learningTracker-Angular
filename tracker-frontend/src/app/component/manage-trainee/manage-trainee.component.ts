import { Component, OnInit } from '@angular/core';
import { ManageTraineeService } from '../../services/manage-trainee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

@Component({
  selector: 'app-manage-trainee',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [ManageTraineeService],
  templateUrl: './manage-trainee.component.html',
  styleUrl: './manage-trainee.component.css'
})
export class ManageTraineeComponent implements OnInit {
  
  trainees : Trainee[] = [];
  id : any='';
  showAlert: boolean= false;
  showSuccessModal : boolean=false;
  showFailureModal : boolean=false;
  edit : boolean = false;
  editMessage : Trainee | null=null;
  dataModified : boolean = false;

  constructor(private ManageTraineeService:ManageTraineeService) {}
  ngOnInit(): void {
    this.ManageTraineeService.getTrainees().subscribe((data) =>{
      this.trainees = data;
    },(error) =>{
      console.log('Error fetching trainees',error)
    });
  }

  chunk(arr: any[], size: number): any[][] {
    return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
  }
}
