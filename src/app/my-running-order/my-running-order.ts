import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import slots, { Slot } from '../my-motocultor/Slots';

@Component({
  selector: 'app-my-running-order',
  imports: [FormsModule],
  templateUrl: './my-running-order.html',
  styleUrl: './my-running-order.css',
})
export class MyRunningOrder {
  slots = slots;
  showFavoritesOnly = signal(false);
  shownSlots = computed(() => {
    return this.showFavoritesOnly()
      ? slots.filter((slot) => slot.isFavorite)
      : slots;
  });

  toggleFavoriteSlot(slot: Slot) {
    slot.isFavorite = !slot.isFavorite;
  }
}
