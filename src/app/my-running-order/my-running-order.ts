import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Scene } from '../my-motocultor/Enums';
import { Slot, slotsBaseList } from '../my-motocultor/Slots';

@Component({
  selector: 'app-my-running-order',
  imports: [FormsModule],
  templateUrl: './my-running-order.html',
  styleUrl: './my-running-order.css',
})
export class MyRunningOrder {
  localStorageFavoritesKey = 'favoritesSlots';
  localStorageFavoritesToggle = 'favoritesToggle';

  slots = signal<Slot[]>(slotsBaseList);
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
    const savedSlots = localStorage.getItem(this.localStorageFavoritesKey);
    if (savedSlots) {
      try {
        this.slots.set(this.#slotsFromJSONString(savedSlots));
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

    console.log(myMap);
    return myMap;
  }

  // TODO Only save ids
  #saveSlots() {
    console.log('Saving slots');
    localStorage.setItem(
      this.localStorageFavoritesKey,
      JSON.stringify(this.slots())
    );
  }

  #slotsFromJSONString(data: string): Slot[] {
    typeof data == 'object';
    const dataArray = JSON.parse(data) as [];

    const savedSlots = dataArray.map((jsonObject) => Slot.fromJSON(jsonObject));
    return savedSlots;
  }

  toggleFavoriteSlot(slot: Slot) {
    slot.isFavorite = !slot.isFavorite;
    this.#saveSlots();
  }
}
