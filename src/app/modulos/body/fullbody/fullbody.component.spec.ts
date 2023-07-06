import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullbodyComponent } from './fullbody.component';

describe('FullbodyComponent', () => {
  let component: FullbodyComponent;
  let fixture: ComponentFixture<FullbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullbodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
