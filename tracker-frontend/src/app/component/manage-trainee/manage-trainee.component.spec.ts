import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTraineeComponent } from './manage-trainee.component';

describe('ManageTraineeComponent', () => {
  let component: ManageTraineeComponent;
  let fixture: ComponentFixture<ManageTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTraineeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
