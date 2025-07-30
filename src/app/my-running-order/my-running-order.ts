import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Scene } from '../my-motocultor/Enums';
import { Slot, slotsBaseList } from '../my-motocultor/Slots';
import { SlotComponent } from './slot/slot';

@Component({
  selector: 'app-my-running-order',
  imports: [FormsModule, SlotComponent],
  templateUrl: './my-running-order.html',
  styleUrl: './my-running-order.css',
})
export class MyRunningOrder {
  localStorageFavoritesKey = 'favoritesSlots';
  localStorageFavoritesToggle = 'favoritesToggle';

  slots = signal<Slot[]>(
    slotsBaseList.sort((a, b) => a.start.getTime() - b.start.getTime())
  );
  favoritedSlots = computed(() =>
    this.slots().filter((slot) => slot.isFavorite)
  );
  showFavoritesOnly = signal(false);
  shownSlots = computed(() => {
    const shownSlots = this.showFavoritesOnly()
      ? this.favoritedSlots()
      : this.slots();
    return shownSlots;
  });
  shownSlotsByScene = computed(() => this.#groupByScene(this.shownSlots()));

  constructor() {
    const savedSlotsJSON = localStorage.getItem(this.localStorageFavoritesKey);
    if (savedSlotsJSON) {
      try {
        const favoritesSlotsIds = JSON.parse(savedSlotsJSON) as string[];
        const savedSlots: Slot[] = this.slots().map((slot) =>
          favoritesSlotsIds.includes(slot.id)
            ? { ...slot, isFavorite: true }
            : slot
        );
        this.slots.set(savedSlots);
      } catch (error) {
        console.log('Issue when fetching slots from local storage: ' + error);
      }
    }

    this.showFavoritesOnly.set(
      JSON.parse(
        localStorage.getItem(this.localStorageFavoritesToggle) || 'false'
      )
    );
    effect(() => {
      console.log('save favorite toggle');
      localStorage.setItem(
        this.localStorageFavoritesToggle,
        JSON.stringify(this.showFavoritesOnly())
      );
    });
  }

  #groupByScene(slots: Slot[]): Map<Scene, Slot[]> {
    const myMap = new Map<Scene, Slot[]>();
    for (const [scene, value] of Object.entries(Scene)) {
      myMap.set(
        value,
        slots.filter((slot) => value == slot.scene)
      );
    }
    return myMap;
  }

  toggleFavoriteSlot(toggledSlot: Slot) {
    console.log('parent toggle faved');
    this.slots.update((currentSlots) =>
      currentSlots.map((currentSlot) =>
        this.#toggleFavoriteIfEquals(currentSlot, toggledSlot)
      )
    );
    this.#saveSlots();
  }
  #toggleFavoriteIfEquals(currentSlot: Slot, toggledSlot: Slot): Slot {
    return currentSlot.id == toggledSlot.id
      ? { ...currentSlot, isFavorite: !currentSlot.isFavorite }
      : currentSlot;
  }

  #saveSlots() {
    console.log('Saving slots');
    const favorites = this.favoritedSlots();
    localStorage.setItem(
      this.localStorageFavoritesKey,
      JSON.stringify(favorites.map((slot) => slot.id))
    );
  }

  toggleShowFavoritesButton() {
    this.showFavoritesOnly.update((state) => !state);
  }
}
