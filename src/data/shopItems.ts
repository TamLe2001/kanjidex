import type { ShopItem } from '../types';

export const shopItems: ShopItem[] = [
  {
    id: 'ziscroll-basic',
    name: 'ZiScroll',
    description: 'A basic scroll used to capture Kanji characters',
    price: 100,
    type: 'scroll'
  },
  {
    id: 'ziscroll-super',
    name: 'Super ZiScroll',
    description: 'An enhanced scroll with higher capture rate',
    price: 300,
    type: 'scroll'
  },
  {
    id: 'ziscroll-ultra',
    name: 'Ultra ZiScroll',
    description: 'The ultimate scroll for capturing rare Kanji',
    price: 600,
    type: 'scroll'
  },
  {
    id: 'potion-health',
    name: 'Health Potion',
    description: 'Restores 50 HP to a Kanji character',
    price: 80,
    type: 'potion'
  },
  {
    id: 'potion-full',
    name: 'Full Restore Potion',
    description: 'Fully restores HP to a Kanji character',
    price: 200,
    type: 'potion'
  }
];

export function getShopItemById(id: string): ShopItem | undefined {
  return shopItems.find(item => item.id === id);
}

export function getScrolls(): ShopItem[] {
  return shopItems.filter(item => item.type === 'scroll');
}

export function getPotions(): ShopItem[] {
  return shopItems.filter(item => item.type === 'potion');
}
