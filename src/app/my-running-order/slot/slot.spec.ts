import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotComponent } from './slot-component';

describe('Slot', () => {
  let component: SlotComponent;
  let fixture: ComponentFixture<SlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
