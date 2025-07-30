import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRunningOrder } from './my-running-order';

describe('MyRunningOrder', () => {
  let component: MyRunningOrder;
  let fixture: ComponentFixture<MyRunningOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRunningOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRunningOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
