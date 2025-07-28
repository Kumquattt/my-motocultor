import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    // Create component to test
    fixture = TestBed.createComponent(App);
    // Access the component through the fixture created by the test framework
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain any text in a <p> tag', () => {
    const element: HTMLElement = fixture.nativeElement;
    const anyP = element.querySelector('p')!;
    expect(anyP.textContent?.length).toBeGreaterThan(0);
  });
});
