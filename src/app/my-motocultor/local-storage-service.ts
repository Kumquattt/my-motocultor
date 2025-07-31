import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorageFavoritesKey = 'favoritesSlotsIds';
  localStorageFavoritesToggle = 'favoritesToggle';

  getSavedFavoriteSlotsIds(): string[] | null {
    const savedSlotsJSON = localStorage.getItem(this.localStorageFavoritesKey);
    console.log(savedSlotsJSON);
    try {
      if (savedSlotsJSON) {
        console.log('a');
        return JSON.parse(savedSlotsJSON) as string[];
      }
    } catch (error) {
      console.log('Issue when fetching slots from local storage: ' + error);
    }
    return null;
  }

  saveFavoritesSlotsIds(ids: string[]) {
    localStorage.setItem(
      this.localStorageFavoritesKey,
      JSON.stringify([...new Set(ids)])
    );
  }

  getSavedShowFavoritesToggle(): boolean {
    return JSON.parse(
      localStorage.getItem(this.localStorageFavoritesToggle) || 'false'
    );
  }

  saveShowFarovitesToggle(state: boolean) {
    localStorage.setItem(
      this.localStorageFavoritesToggle,
      JSON.stringify(state)
    );
  }
}
