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
    return this.#getContent(this.favoritesKey);
  }
  saveFavoritesSlotsIds(ids: string[]) {
    this.#setContent(this.favoritesKey, [...new Set(ids)]);
  }

  getSavedShowFavoritesToggle(): boolean {
    return this.#getContent(this.favedToggleKey) || false;
  }
  saveShowFarovitesToggle(state: boolean) {
    this.#setContent(this.favedToggleKey, state);
  }

  getSavedDay(): Day {
    return this.#getContent(this.dayKey) as Day;
  }
  saveDay(day: Day | null) {
    this.#setContent(this.dayKey, day);
  }

  #getContent(key: string): any {
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
