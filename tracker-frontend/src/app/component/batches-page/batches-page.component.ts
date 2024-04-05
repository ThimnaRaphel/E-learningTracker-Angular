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
  imports: [CommonModule,BatchcardComponent,HttpClientModule],
  providers:[BatchService],
  templateUrl: './batches-page.component.html',
  styleUrl: './batches-page.component.css'
})


export class BatchesPageComponent implements OnInit{
  batches : BatchDetails[]=[];
  edit=false;
  batchId : string='';
  batchName : string='';
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

  editBatch(batch_id:any):void{
    this.edit=true;
    console.log('edir')
    console.log(this.edit);
  }

}



