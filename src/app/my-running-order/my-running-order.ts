import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Day, Scene } from '../my-motocultor/Enums';
import { LocalStorageService } from '../my-motocultor/local-storage-service';
import { Slot, slotsBaseList } from '../my-motocultor/Slots';
import { SlotComponent } from './slot/slot';

@Component({
  selector: 'app-my-running-order',
  imports: [FormsModule, SlotComponent],
  templateUrl: './my-running-order.html',
  styleUrl: './my-running-order.css',
})
export class MyRunningOrder {
  //// VARIABLES ////
  localStorageService = inject(LocalStorageService);
  Days = Object.entries(Day);

  slots = signal<Slot[]>(this.#initializeSlots());
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
  selectedDay = signal<Day | null>(null);
  shownSlotsByDay = computed(() =>
    this.selectedDay()
      ? this.shownSlots().filter((slot) => this.selectedDay() == slot.day)
      : this.shownSlots()
  );
  shownSlotsByScene = computed<Map<Scene, Slot[]>>(() =>
    this.#groupByScene(this.shownSlotsByDay())
  );

  //// METHODS ////
  constructor() {
    console.log(this.slots());
    const favoritedSlotsIds =
      this.localStorageService.getSavedFavoriteSlotsIds();
    if (favoritedSlotsIds) {
      const savedSlots: Slot[] = this.slots().map((slot) =>
        favoritedSlotsIds.includes(slot.id)
          ? { ...slot, isFavorite: true }
          : slot
      );
      this.slots.set(savedSlots);
    }

    this.showFavoritesOnly.set(
      this.localStorageService.getSavedShowFavoritesToggle()
    );
    effect(() => {
      console.log('Saving favorite toggle');
      this.localStorageService.saveShowFarovitesToggle(
        this.showFavoritesOnly()
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
    this.localStorageService.saveFavoritesSlotsIds(
      favorites.map((slot) => slot.id)
    );
  }

  // TODO days; if click on current days, remove day

  selectDay(day: Day | null) {
    if (day && this.selectedDay() == day) {
      this.selectedDay.set(null);
    } else {
      this.selectedDay.set(day);
    }
  }
  isSelected(day: Day | null) {
    return day == this.selectedDay();
  }

  toggleShowFavoritesButton() {
    this.showFavoritesOnly.update((state) => !state);
  }

  #initializeSlots(): Slot[] {
    const slots = slotsBaseList.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
    // For coloring
    for (let index = 1; index < slots.length; index += 2) {
       slots[index].isEven = false;
     }
    return slots;
  }
}
