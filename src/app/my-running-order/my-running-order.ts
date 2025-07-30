import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Scene } from '../my-motocultor/Enums';
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

  shownSlotsByScene = computed(() => this.#groupByScene(this.shownSlots()));

  #groupByScene(slots: Slot[]): Map<Scene, Slot[]> {
    const myMap = new Map<Scene, Slot[]>();
    for (const [scene, value] of Object.entries(Scene)) {
      myMap.set(
        value,
        slots.filter((slot) => value == slot.scene)
      );
    }

    console.log(myMap);
    return myMap;
  }

  toggleFavoriteSlot(slot: Slot) {
    slot.isFavorite = !slot.isFavorite;
  }
}
