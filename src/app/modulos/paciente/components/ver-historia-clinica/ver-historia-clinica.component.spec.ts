import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistoriaClinicaComponent } from './ver-historia-clinica.component';

describe('VerHistoriaClinicaComponent', () => {
  let component: VerHistoriaClinicaComponent;
  let fixture: ComponentFixture<VerHistoriaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerHistoriaClinicaComponent]
    });
    fixture = TestBed.createComponent(VerHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
