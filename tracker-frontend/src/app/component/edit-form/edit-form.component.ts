import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { EditBatchService } from '../../services/edit-batch.service';

interface EditBatchDetails{
  batch_id : string
  batch_name : string;
  start_date : string;
  end_date : string
}
@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,],
  providers:[EditBatchService],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  @Input() editBatchDetails:EditBatchDetails | null = null;
  @Input() edit:boolean = true;
  @Output() onEditClose = new EventEmitter<EditBatchDetails|null>();
  editForm! : FormGroup
  showFormModal:boolean = false;
  isEdited: boolean = false;
  isFormSubmitted: boolean = false;
  
  constructor (private fb:FormBuilder,private editBatchService:EditBatchService){
    this.editForm = this.fb.group({
      name : new FormControl('',[Validators.required]),
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
    if(this.editForm.valid && (this.isEdited||this.isFormSubmitted)){
      console.log(this.editForm.value)
      const { batch_id,batch_name,start_date,end_date } = this.editForm.value;
      if(this.editBatchDetails){
        console.log('entry 1')
        this.editBatchService
        .updateContact(this.editBatchDetails.batch_id,batch_name,start_date,end_date)
        .subscribe(
          (response)=>{
            this.onEditClose.emit(response);
            this.editForm.reset();
            console.log("ts -edit")
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
    if(changes['editBatchDetails']){
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

  onFormChange() {
    this.isFormSubmitted = true;
  }
      
}
