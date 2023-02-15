import { TestBed } from '@angular/core/testing';

import { PacienteApiService } from './paciente.api.service';

describe('PacienteApiService', () => {
  let service: PacienteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
