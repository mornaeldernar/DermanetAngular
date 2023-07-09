import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyitemComponent } from './bodyitem.component';

describe('BodyitemComponent', () => {
  let component: BodyitemComponent;
  let fixture: ComponentFixture<BodyitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyitemComponent]
    });
    fixture = TestBed.createComponent(BodyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
