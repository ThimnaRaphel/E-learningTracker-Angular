import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BatchcardComponent } from '../batchcard/batchcard.component';

@Component({
  selector: 'app-batches-page',
  standalone: true,
  imports: [CommonModule,BatchcardComponent],
  templateUrl: './batches-page.component.html',
  styleUrl: './batches-page.component.css'
})
export class BatchesPageComponent {

}
