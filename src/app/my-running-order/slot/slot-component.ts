import { Component, input, output } from '@angular/core';
import { Slot } from '../../my-motocultor/Slots';

@Component({
  selector: 'app-slot-component',
  imports: [],
  templateUrl: './slot.html',
  styleUrl: './slot.css',
})
export class SlotComponent {
  slotInput = input<Slot | null>(null);
  favoriteToggle = output();

  toggleFavoriteSlot() {
    this.favoriteToggle.emit();
  }

  printTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    var minutesString = minutes.toString();
    if (minutes == 0) {
      minutesString = '00';
    } else if (minutes < 10) {
      minutesString = `0${minutesString}`;
    }

    return `${hours}:${minutesString}`;
  }
}
