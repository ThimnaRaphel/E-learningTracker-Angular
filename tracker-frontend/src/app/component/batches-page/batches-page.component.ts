import { EditFormComponent } from './../edit-form/edit-form.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BatchcardComponent } from '../batchcard/batchcard.component';
import { BatchService } from '../../services/batch.service';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';


interface BatchDetails{
  batch_id : string
  batch_name : string,
  start_date :string,
  end_date : string,
  noOfTrainees : string,
  progress : number
}
@Component({
  selector: 'app-batches-page',
  standalone: true,
  imports: [CommonModule,BatchcardComponent,HttpClientModule,EditFormComponent],
  providers:[BatchService],
  templateUrl: './batches-page.component.html',
  styleUrl: './batches-page.component.css'
})


export class BatchesPageComponent implements OnInit{
  batches : BatchDetails[]=[];
  edit=false;
  batchId : string='';
  batchName : string='';
  startDate : string='';
  endDate : string='';

  

  constructor(private batchService : BatchService) {}
  ngOnInit(): void {
    this.batchService.getBatches().subscribe((data : any) =>{
      this.batches = data.batches;
      console.log(data);
      console.log("asdfghjk",this.batches);
    },(error: any) =>{
      console.log('Error fetching messages',error)
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "March",
      "April", "May", "June", "July",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day}${this.getDaySuffix(day)} ${monthNames[monthIndex]} ${year}`;
  }

  getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  chunk(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  
  editBatch(batch_id:any):void{
    this.edit=true;
    console.log('edir')
    console.log(this.edit);
    console.log(batch_id);
    localStorage.setItem("batch_id",batch_id);
  }

  onCloseEditForm(): void {
    this.edit = false;
  }

}



