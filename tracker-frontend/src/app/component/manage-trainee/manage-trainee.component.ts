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
  user_id : string='';
  user_name : string = '';
  showAlert: boolean= false;
  showSuccessModal : boolean=false;
  showFailureModal : boolean=false;
  edit : boolean = false;
  editMessage : Trainee | null=null;
  dataModified : boolean = false;
  deactivatedStatus : boolean |null = null;
  deactivatedFailure : boolean |null = null;
  status : any = 0;

  constructor(private ManageTraineeService:ManageTraineeService) {}
  ngOnInit(): void {
    this.ManageTraineeService.getTrainees().subscribe((data) =>{
      this.trainees = data;
    },(error) =>{
      console.log('Error fetching trainees',error)
    });
  }

  chunk(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  deactivateTrainee(user_id : string, user_name : string){
    this.user_id = user_id;
    this.user_name = user_name;
    this.showAlert = true;
  }

  confirm() {
    this.showAlert = false;
    console.log("user_id--------", this.user_id);
    this.ManageTraineeService
          .deactivateTrainee(this.user_id,  this.user_name, this.status)
          .subscribe(
            (response) => {
                console.log("Successfully deactivated");
                this.deactivatedStatus=true;
                setTimeout(() => {
                  this.deactivatedStatus=null;
                  location.reload();
                }, 2000);
            },
            (error) => {
              console.error('Error Deactivating Trainee:', error);
              this.deactivatedStatus=false;
                setTimeout(() => {
                  this.deactivatedFailure=null;
                }, 2000);
            }
          );
  }

  cancel(){
    this.user_id = '';
    this.user_name = '';
    this.showAlert = false;
  }

}
