import { TestBed } from '@angular/core/testing';

import { BodyApiService } from './body.api.service';

describe('BodyApiService', () => {
  let service: BodyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
