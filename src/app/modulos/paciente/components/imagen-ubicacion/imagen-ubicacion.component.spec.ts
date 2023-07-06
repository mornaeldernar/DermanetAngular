import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenUbicacionComponent } from './imagen-ubicacion.component';

describe('ImagenUbicacionComponent', () => {
  let component: ImagenUbicacionComponent;
  let fixture: ComponentFixture<ImagenUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
