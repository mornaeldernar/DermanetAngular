import { TestBed } from '@angular/core/testing';

import { DiagnosticoApiService } from './diagnostico.api.service';

describe('DiagnosticoApiService', () => {
  let service: DiagnosticoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
