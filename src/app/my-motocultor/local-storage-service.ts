import { Injectable } from '@angular/core';
import { Day } from './Enums';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  favoritesKey = 'favoritesSlotsIds';
  favedToggleKey = 'favoritesToggle';
  dayKey = 'selectedDay';

  getSavedFavoriteSlotsIds(): string[] | null {
    const savedSlotsJSON = localStorage.getItem(this.favoritesKey);
    try {
      if (savedSlotsJSON) {
        return JSON.parse(savedSlotsJSON) as string[];
      }
    } catch (error) {
      console.error('Issue when fetching slots from local storage: ' + error);
    }
    return null;
  }
  saveFavoritesSlotsIds(ids: string[]) {
    localStorage.setItem(this.favoritesKey, JSON.stringify([...new Set(ids)]));
  }

  getSavedShowFavoritesToggle(): boolean {
    return this.#parseContent(this.favedToggleKey) || false;
  }
  saveShowFarovitesToggle(state: boolean) {
    localStorage.setItem(this.favedToggleKey, JSON.stringify(state));
  }

  getSavedDay(): Day {
    return this.#parseContent(this.dayKey) as Day;
  }
  saveDay(day: Day | null) {
    this.#setContent(this.dayKey, day);
  }

  #parseContent(key: string): any {
    const content = localStorage.getItem(key);
    if (content) {
      return JSON.parse(content);
    }
    return null;
  }
  #setContent(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
