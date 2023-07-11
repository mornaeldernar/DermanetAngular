import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrolistComponent } from './microlist.component';

describe('MicrolistComponent', () => {
  let component: MicrolistComponent;
  let fixture: ComponentFixture<MicrolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicrolistComponent]
    });
    fixture = TestBed.createComponent(MicrolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
