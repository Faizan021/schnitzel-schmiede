export type AllergenKey = 'A' | 'C' | 'G' | 'I' | 'J' | 'K' | 'L';

export interface AllergenInfo {
  code: AllergenKey;
  label: string;
  description: string;
}

export const ALLERGEN_CATALOG: Record<AllergenKey, AllergenInfo> = {
  A: { code: 'A', label: 'Gluten', description: 'Glutenhaltiges Getreide (Weizenpanade)' },
  C: { code: 'C', label: 'Eier', description: 'Eier (Panierstraße / Saucen)' },
  G: { code: 'G', label: 'Milch & Laktose', description: 'Milchprodukte (Rahmsaucen, Butter)' },
  I: { code: 'I', label: 'Sellerie', description: 'Sellerie (hausgemachte Fonds & Jus)' },
  J: { code: 'J', label: 'Senf', description: 'Senf (Dressings & Marinaden)' },
  K: { code: 'K', label: 'Sesam', description: 'Sesamsamen (Burger Buns)' },
  L: { code: 'L', label: 'Schwefeldioxid', description: 'Sulfite (Saucen-Reduktionen)' },
};

export type DietaryTag = 'halal' | 'veggie' | 'bestseller' | 'chef_special' | 'spicy';

export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  category: 'schnitzel' | 'specials' | 'burgers' | 'fries' | 'kids' | 'desserts' | 'drinks';
  image: string;
  allergens: AllergenKey[];
  tags: DietaryTag[];
  isCustomizable?: boolean;
  defaultPortion?: string;
}
