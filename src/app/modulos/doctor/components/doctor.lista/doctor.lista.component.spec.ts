import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListaComponent } from './doctor.lista.component';

describe('DoctorListaComponent', () => {
  let component: DoctorListaComponent;
  let fixture: ComponentFixture<DoctorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
