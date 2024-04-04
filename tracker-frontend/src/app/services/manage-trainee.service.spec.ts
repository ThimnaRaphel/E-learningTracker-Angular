import { TestBed } from '@angular/core/testing';

import { ManageTraineeService } from './manage-trainee.service';

describe('ManageTraineeService', () => {
  let service: ManageTraineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTraineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
