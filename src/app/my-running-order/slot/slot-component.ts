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

  printTime(minute: number): string {
    if (minute < 10) {
      return '0' + minute;
    } else {
      return minute.toString();
    }
  }
}
