import { TestBed } from '@angular/core/testing';

import { EditBatchService } from './edit-batch.service';

describe('EditBatchService', () => {
  let service: EditBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
