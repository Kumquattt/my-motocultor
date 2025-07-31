import { Component, input, output, signal } from '@angular/core';
import { Day } from '../../my-motocultor/Enums';

@Component({
  selector: 'app-day-button',
  imports: [],
  templateUrl: './day-button.html',
  styleUrl: './day-button.css',
})
export class DayButton {
  day = input<Day | string>('*');
  dayClick = output<Day | null>();
  isSelected = signal(false);

  selectDay() {
    this.isSelected.update((state) => !state);
  }
}
