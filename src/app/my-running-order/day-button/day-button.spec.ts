import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayButton } from './day-button';

describe('DayButton', () => {
  let component: DayButton;
  let fixture: ComponentFixture<DayButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
