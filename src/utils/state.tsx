// state.ts
import { atom } from 'jotai';

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
};

export const groceryAtom = atom<GroceryItem[]>([]);
