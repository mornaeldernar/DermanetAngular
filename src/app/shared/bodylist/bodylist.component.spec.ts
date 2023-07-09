import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodylistComponent } from './bodylist.component';

describe('BodylistComponent', () => {
  let component: BodylistComponent;
  let fixture: ComponentFixture<BodylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodylistComponent]
    });
    fixture = TestBed.createComponent(BodylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
