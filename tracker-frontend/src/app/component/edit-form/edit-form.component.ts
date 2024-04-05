import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { EditBatchService } from '../../services/edit-batch.service';
import { Router, RouterLink } from '@angular/router';

interface EditBatchDetails{
  batch_id : string
  batch_name : string;
  start_date : string;
  end_date : string
}

const batchId = localStorage.getItem('batch_id');
@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,RouterLink],
  providers:[EditBatchService],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnChanges{
  @Input() editBatchDetails:EditBatchDetails | null = null;
  @Input() edit:boolean = true;
  @Output() onEditClose = new EventEmitter<EditBatchDetails|null>();
  @Output() closeForm = new EventEmitter<void>();
  editForm! : FormGroup
  showFormModal:boolean = false;
  isEdited = false;
  isFormSubmitted = false;
  // showForm=true;
  // isFormOpen: boolean = false
  
  constructor (private fb:FormBuilder,private editBatchService:EditBatchService,private router: Router){
    this.editForm = this.fb.group({
      batchId,
      BatchName : new FormControl('',[Validators.required]),
      startDate : new FormControl('',[Validators.required]),
      endDate : new FormControl('',[Validators.required]),
    })
  }
  
  ngOnInit(): void {
  }

  onSubmit(){
    console.log("hiiiiiiiiiiiiiiiiiiiiii")
    console.log(this.editForm.value)
    console.log(this.isEdited)
    console.log(this.isFormSubmitted)
    if(this.editForm.valid){
      console.log(this.editForm.value)
      const { batchId,BatchName,startDate,endDate } = this.editForm.value;
      console.log(this.editBatchDetails);
      if(this.editForm.value){
        console.log('entry 1')
        this.editBatchService
        .updateContact(batchId,BatchName,startDate,endDate)
        .subscribe(
          (response)=>{
            this.onEditClose.emit(response);
            this.editForm.reset();
            console.log(response);
            console.log("ts -edit")
            this.isEdited=true;
            setTimeout(() => {
              this.isEdited=false;
              location.reload();
            }, 2000);
          },
          (error)=>{
            console.error('Error update contact:',error)
          }
        );
      }
    //     else{
    //       this.editBatchService.submitContact(name,email,mobile,message)
    //   .subscribe(response=>{
    //     console.log('Contact submitted successfully', response)
    //     this.contactForm.reset();
    //     this.showFormModal=true;
    //     setTimeout(() => {
    //       this.showFormModal = false;
    //     }, 3000);
    //   },error=>{
    //     console.error('Error submitting contact',error)
    //   })
    // }
  }
    else{
      this.editForm.markAllAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['endDate']){
      if(this.editBatchDetails){
        this.editForm.patchValue({
          name : this.editBatchDetails.batch_name,
          startDate:this.editBatchDetails.start_date,
          endDate:this.editBatchDetails.end_date,
        })
        this.isEdited=true;
      }
    }
  }

    onClose(): void {
      this.closeForm.emit();
    }

      
}
