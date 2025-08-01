import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dimanche } from '../my-motocultor/assets/running-order/dimanche';
import { jeudi } from '../my-motocultor/assets/running-order/jeudi';
import { samedi } from '../my-motocultor/assets/running-order/samedi';
import { vendredi } from '../my-motocultor/assets/running-order/vendredi';
import { Day, Scene } from '../my-motocultor/Enums';
import { LocalStorageService } from '../my-motocultor/local-storage-service';
import { Slot } from '../my-motocultor/Slots';
import { SlotComponent } from './slot/slot-component';

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
  showFavoritesToggle = signal(false);
  // No filter: keep non-favorites but dimmed
  shownSlots = computed(() => this.slots());
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
    this.#updateFromSavedFavorites();
    this.#updateFromSavedDay();

    this.showFavoritesToggle.set(
      this.localStorageService.getSavedShowFavoritesToggle()
    );
    effect(() => {
      console.log('Saving favorite toggle');
      this.localStorageService.saveShowFarovitesToggle(
        this.showFavoritesToggle()
      );
    });
  }

  #updateFromSavedFavorites() {
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
  }

  #updateFromSavedDay() {
    const savedDay = this.localStorageService.getSavedDay();
    if (savedDay) {
      this.selectedDay.set(savedDay);
    }
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

  selectDay(day: Day | null) {
    if (day && this.selectedDay() == day) {
      this.selectedDay.set(null);
    } else {
      this.selectedDay.set(day);
    }
    this.localStorageService.saveDay(day);
  }
  isSelected(day: Day | null) {
    return day == this.selectedDay();
  }

  toggleShowFavoritesButton() {
    this.showFavoritesToggle.update((state) => !state);
  }

  #initializeSlots(): Slot[] {
    const slots = [...jeudi, ...vendredi, ...samedi, ...dimanche].map(
      (jsonSlot) => Slot.fromJSON(jsonSlot)
    );
    // .sort((a, b) => a.start.getTime() - b.start.getTime());
    return slots;
  }

  sceneNeedsInitialSpacer(scene: Scene) {
    return [Scene.MF, Scene.SS].includes(scene);
  }
}
