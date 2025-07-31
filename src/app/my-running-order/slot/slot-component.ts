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
    this.favoriteToggle.emit()
  }

  printTime(time: Date): string {
    const hours = time.getHours()
    const minutes = time.getMinutes() == 0 ? '00' : time.getMinutes()

    return `${hours}:${minutes}`
  }
}
