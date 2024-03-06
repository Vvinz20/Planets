import { TestBed } from '@angular/core/testing';

import { StarsApiService } from './stars-api.service';

describe('StarsApiService', () => {
  let service: StarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
