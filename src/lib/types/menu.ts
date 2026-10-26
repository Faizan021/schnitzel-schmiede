export type AllergenKey = 'A' | 'C' | 'G' | 'I' | 'J' | 'K' | 'L';

export interface AllergenInfo {
  code: AllergenKey;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
}

export const ALLERGEN_CATALOG: Record<AllergenKey, AllergenInfo> = {
  A: {
    code: 'A',
    label: 'Gluten',
    labelEn: 'Gluten',
    description: 'Glutenhaltiges Getreide (Weizenpanade)',
    descriptionEn: 'Cereals containing gluten (wheat breading)',
  },
  C: {
    code: 'C',
    label: 'Eier',
    labelEn: 'Eggs',
    description: 'Eier (Panierstraße / Saucen)',
    descriptionEn: 'Eggs (breading line / sauces)',
  },
  G: {
    code: 'G',
    label: 'Milch & Laktose',
    labelEn: 'Milk & Lactose',
    description: 'Milchprodukte (Rahmsaucen, Butter)',
    descriptionEn: 'Dairy products (cream sauces, butter)',
  },
  I: {
    code: 'I',
    label: 'Sellerie',
    labelEn: 'Celery',
    description: 'Sellerie (hausgemachte Fonds & Jus)',
    descriptionEn: 'Celery (homemade stocks & jus)',
  },
  J: {
    code: 'J',
    label: 'Senf',
    labelEn: 'Mustard',
    description: 'Senf (Dressings & Marinaden)',
    descriptionEn: 'Mustard (dressings & marinades)',
  },
  K: {
    code: 'K',
    label: 'Sesam',
    labelEn: 'Sesame',
    description: 'Sesamsamen (Burger Buns)',
    descriptionEn: 'Sesame seeds (burger buns)',
  },
  L: {
    code: 'L',
    label: 'Schwefeldioxid',
    labelEn: 'Sulphur Dioxide',
    description: 'Sulfite (Saucen-Reduktionen)',
    descriptionEn: 'Sulphites (wine sauce reductions)',
  },
};

export type DietaryTag = 'regional' | 'veggie' | 'bestseller' | 'chef_special' | 'spicy';

export type MenuItemCategory =
  | 'schnitzel'
  | 'schnitzel_110g'
  | 'specials'
  | 'party'
  | 'burgers'
  | 'fries'
  | 'salads'
  | 'kids'
  | 'desserts'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  category: MenuItemCategory;
  image?: string;
  allergens: AllergenKey[];
  tags: DietaryTag[];
  isCustomizable?: boolean;
  defaultPortion?: string;
}
