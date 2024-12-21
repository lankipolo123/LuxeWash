import { Injectable } from '@angular/core';

export interface FavoriteItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteItems: FavoriteItem[] = [];

  constructor() {
    this.loadFavorites();
  }

  getFavorites(): FavoriteItem[] {
    return this.favoriteItems;
  }

  addToFavorites(item: FavoriteItem): void {
    if (!this.favoriteItems.some((favItem) => favItem.id === item.id)) {
      this.favoriteItems.push(item);
      this.saveFavorites();
    }
  }

  removeFromFavorites(item: FavoriteItem): void {
    this.favoriteItems = this.favoriteItems.filter((favItem) => favItem.id !== item.id);
    this.saveFavorites();
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favoriteItems');
    if (savedFavorites) {
      this.favoriteItems = JSON.parse(savedFavorites);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems));
  }
}