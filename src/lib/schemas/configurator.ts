import { z } from 'zod';
import { AllergenKey } from '../types/menu';

export const MeatBaseEnum = z.enum([
  'haehnchen',     // Zartes Hähnchenbrustfilet (100% Halal)
  'kalb',          // Original Wiener Art vom Kalb (+4.50€)
  'schwein',       // Traditionelles Schweine-Rückensteak
  'veggie_plant'   // Hausgemachtes Kichererbsen-Kräuter-Schnitzel (Veggie)
]);

export const SchnitzelSizeEnum = z.enum([
  'normal',        // ca. 220g Frischfleisch-Einwaage
  'schmiede_xxl'   // ca. 440g Doppeltes Schnitzel-Glück (+5.50€)
]);

export const BreadcrumbCrustEnum = z.enum([
  'klassik_gold',   // Traditionelle goldbraune Semmelbrösel
  'panko_crunch',   // Japanische Panko-Flocken für maximalen Crunch (+0.80€)
  'brezel_rustikal',// Hausgemachte bayerische Brezelpanade (+1.20€)
  'cornflakes_hot', // Spicy Chili-Cornflakes-Panade (+1.00€)
  'glutenfrei'      // Spezielle glutenfreie Knusper-Panade (+1.50€)
]);

export const SauceSelectionEnum = z.enum([
  'ohne_sauce',         // Pur mit Zitronenecke & Kräuterbutter
  'champignon_rahm',    // Schmiede Champignon-Rahmsauce mit frischen Kräutern (+2.50€)
  'zigeuner_schmiede',  // Paprika-Zwiebel-Pfeffer Sud nach Art des Hauses (+2.50€)
  'gruener_pfeffer',    // Madagaskar Pfeffer-Cognac-Rahm (+2.80€)
  'hollandaise',        // Cremige Sauce Hollandaise (+2.40€)
  'braune_bratensauce'  // 24h geschmorter Rinder-Zwiebel-Jus (+2.60€)
]);

export const SideDishEnum = z.enum([
  'pommes_knusprig',     // Steakhouse Pommes mit Schmiede-Kräutersalz
  'bratkartoffeln',      // Knusprige Bratkartoffeln mit Zwiebeln (+1.20€)
  'suesskartoffel_fries',// Süßkartoffelpommes mit Trüffelmayo (+2.20€)
  'gurkensalat_dill',    // Rheinischer Gurkensalat mit Schmand & frischem Dill
  'gemischter_salat',    // Bunter Marktsalat mit Haus-Dressing
  'kartoffelsalat'       // Hausgemachter rheinischer Kartoffelsalat
]);

export const ExtraToppingEnum = z.enum([
  'spiegelei',          // Frisches Land-Spiegelei (+1.50€)
  'preiselbeeren',      // Wildpreiselbeeren & Bio-Zitrone (+1.20€)
  'gouda_gratiniert',   // Im Ofen mit mittelaltem Gouda überbacken (+2.50€)
  'jalapenos',          // Feurige Jalapeño-Ringe (+1.00€)
  'roestzwiebeln'       // Knusprige Röstzwiebeln (+1.20€)
]);

export const SchnitzelConfigSchema = z.object({
  id: z.string(),
  meat: MeatBaseEnum,
  size: SchnitzelSizeEnum,
  crust: BreadcrumbCrustEnum,
  sauce: SauceSelectionEnum,
  sauceSeparated: z.boolean().default(true), // Sauce standardmäßig separat, damit Panade kross bleibt!
  side: SideDishEnum,
  extras: z.array(ExtraToppingEnum).default([]),
  specialInstructions: z.string().max(160).optional(),
  unitPrice: z.number().min(12.90),
  allergens: z.array(z.custom<AllergenKey>()).default([]),
});

export type SchnitzelConfig = z.infer<typeof SchnitzelConfigSchema>;

export interface ConfigOptionMeta {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
  badge?: string;
  allergens?: AllergenKey[];
}

export const MEAT_OPTIONS: Record<z.infer<typeof MeatBaseEnum>, ConfigOptionMeta> = {
  haehnchen: {
    id: 'haehnchen',
    name: 'Zartes Hähnchenbrustfilet',
    description: '100% Halal zertifiziert, saftig von Hand geklopft',
    priceDelta: 0.0,
    badge: '100% Halal',
    allergens: ['A', 'C'],
  },
  kalb: {
    id: 'kalb',
    name: 'Original Kalbsschnitzel',
    description: 'Hauchdünnes Kalbsrückensteak nach Wiener Art',
    priceDelta: 4.5,
    badge: 'Premium',
    allergens: ['A', 'C'],
  },
  schwein: {
    id: 'schwein',
    name: 'Klassisches Schweinesteak',
    description: 'Frisches Schweinelachssteak aus regionaler Haltung',
    priceDelta: 0.0,
    allergens: ['A', 'C'],
  },
  veggie_plant: {
    id: 'veggie_plant',
    name: 'Hausgemachtes Veggie-Schnitzel',
    description: 'Auf Basis von Kichererbsen, Sellerie und feinen Kräutern',
    priceDelta: 0.0,
    badge: 'Vegetarisch',
    allergens: ['A', 'C', 'I'],
  },
};

export const SIZE_OPTIONS: Record<z.infer<typeof SchnitzelSizeEnum>, ConfigOptionMeta> = {
  normal: {
    id: 'normal',
    name: 'Klassik-Portion (ca. 220g)',
    description: 'Perfekt für den herzhaften Hunger',
    priceDelta: 0.0,
  },
  schmiede_xxl: {
    id: 'schmiede_xxl',
    name: 'Schmiede-XXL (ca. 440g — 2 Schnitzel)',
    description: 'Zwei meisterhaft panierte Schnitzel für den Riesenhunger',
    priceDelta: 5.5,
    badge: 'XXL Bestseller',
  },
};

export const CRUST_OPTIONS: Record<z.infer<typeof BreadcrumbCrustEnum>, ConfigOptionMeta> = {
  klassik_gold: {
    id: 'klassik_gold',
    name: 'Traditionelle Goldpanade',
    description: 'Fein gemahlene Semmelbrösel, goldgelb in Butterschmalz souffliert',
    priceDelta: 0.0,
    allergens: ['A', 'C'],
  },
  panko_crunch: {
    id: 'panko_crunch',
    name: 'Japanischer Panko-Crunch',
    description: 'Grobe Panko-Flocken für maximalen Knuspereffekt',
    priceDelta: 0.8,
    badge: 'Extra Kross',
    allergens: ['A', 'C'],
  },
  brezel_rustikal: {
    id: 'brezel_rustikal',
    name: 'Bayerische Brezelpanade',
    description: 'Aus frisch geriebenen Laugenbrezeln mit feinem Salzcrunch',
    priceDelta: 1.2,
    badge: 'Craft Special',
    allergens: ['A', 'C'],
  },
  cornflakes_hot: {
    id: 'cornflakes_hot',
    name: 'Hot-Chili Cornflakes',
    description: 'Feurig-würzige Cornflakes-Kruste mit milder Schärfe',
    priceDelta: 1.0,
    badge: 'Scharf',
    allergens: ['A', 'C'],
  },
  glutenfrei: {
    id: 'glutenfrei',
    name: 'Glutenfreie Knusperpanade',
    description: 'Auf Mais- und Reismehlbasis, in separatem Frittierbereich zubereitet',
    priceDelta: 1.5,
    badge: 'Glutenfrei',
    allergens: ['C'],
  },
};

export const SAUCE_OPTIONS: Record<z.infer<typeof SauceSelectionEnum>, ConfigOptionMeta> = {
  ohne_sauce: {
    id: 'ohne_sauce',
    name: 'Pur mit Zitrone & Kräuterbutter',
    description: 'Klassisch puristisch mit frischer Zitronenspalte',
    priceDelta: 0.0,
    allergens: ['G'],
  },
  champignon_rahm: {
    id: 'champignon_rahm',
    name: 'Schmiede Champignon-Rahmsauce',
    description: 'Frische braune Champignons, Schalotten, Rahm & Petersilie',
    priceDelta: 2.5,
    badge: 'Haus-Favorit',
    allergens: ['G', 'I'],
  },
  zigeuner_schmiede: {
    id: 'zigeuner_schmiede',
    name: 'Schmiede Paprikasauce (Ungarische Art)',
    description: 'Pikanter Paprika-Zwiebel-Tomaten Sud mit milden Pfefferoni',
    priceDelta: 2.5,
    allergens: ['I', 'J'],
  },
  gruener_pfeffer: {
    id: 'gruener_pfeffer',
    name: 'Grüner Pfeffer-Cognac-Rahm',
    description: 'Ganze Madagaskar-Pfefferkörner, flambiert mit Weinbrand und Rahm',
    priceDelta: 2.8,
    allergens: ['G', 'L'],
  },
  hollandaise: {
    id: 'hollandaise',
    name: 'Cremige Sauce Hollandaise',
    description: 'Feine Buttersauce mit Eigelb und feiner Weißwein-Säure',
    priceDelta: 2.4,
    allergens: ['C', 'G'],
  },
  braune_bratensauce: {
    id: 'braune_bratensauce',
    name: '24h Geschmorter Rinder-Jus',
    description: 'Kräftige dunkle Bratensauce, langsam eingekocht',
    priceDelta: 2.6,
    allergens: ['I'],
  },
};

export const SIDE_OPTIONS: Record<z.infer<typeof SideDishEnum>, ConfigOptionMeta> = {
  pommes_knusprig: {
    id: 'pommes_knusprig',
    name: 'Knusprige Steakhouse-Pommes',
    description: 'Außen kross, innen kartoffelig weich mit Schmiede-Kräutersalz',
    priceDelta: 0.0,
  },
  bratkartoffeln: {
    id: 'bratkartoffeln',
    name: 'Rheinische Bratkartoffeln',
    description: 'In der Gusspfanne mit geschmorten Zwiebeln & Majoran geröstet',
    priceDelta: 1.2,
    badge: 'Empfehlung',
  },
  suesskartoffel_fries: {
    id: 'suesskartoffel_fries',
    name: 'Süßkartoffel-Pommes & Trüffelmayo',
    description: 'Feine Süßkartoffelstäbchen mit hausgemachter Trüffel-Dip',
    priceDelta: 2.2,
    allergens: ['C', 'J'],
  },
  gurkensalat_dill: {
    id: 'gurkensalat_dill',
    name: 'Frischer Gurkensalat mit Dill',
    description: 'Knackige Landgurken mit cremigem Schmand-Dill-Dressing',
    priceDelta: 0.0,
    allergens: ['G'],
  },
  gemischter_salat: {
    id: 'gemischter_salat',
    name: 'Bunter Marktsalat',
    description: 'Blattsalate, Kirschtomaten, Radieschen und Haus-Vinaigrette',
    priceDelta: 0.0,
    allergens: ['J'],
  },
  kartoffelsalat: {
    id: 'kartoffelsalat',
    name: 'Rheinischer Kartoffelsalat',
    description: 'Hausgemacht mit Brühe, Zwiebeln und feinem Essig-Öl-Dressing',
    priceDelta: 0.0,
    allergens: ['I', 'J'],
  },
};

export const EXTRA_OPTIONS: Record<z.infer<typeof ExtraToppingEnum>, ConfigOptionMeta> = {
  spiegelei: {
    id: 'spiegelei',
    name: 'Frisches Land-Spiegelei',
    description: 'Mit flüssigem Eigelb obenauf serviert ("Holsteinische Art")',
    priceDelta: 1.5,
    allergens: ['C'],
  },
  preiselbeeren: {
    id: 'preiselbeeren',
    name: 'Wildpreiselbeeren & Zitrone',
    description: 'Herbfruchtige Preiselbeeren und Bio-Zitronenecken',
    priceDelta: 1.2,
  },
  gouda_gratiniert: {
    id: 'gouda_gratiniert',
    name: 'Mit Gouda gratiniert',
    description: 'Im Salamander mit herzhaftem Gouda geschmolzen',
    priceDelta: 2.5,
    allergens: ['G'],
  },
  jalapenos: {
    id: 'jalapenos',
    name: 'Würzige Jalapeños',
    description: 'Eingelegte scharfe Chilis für den feurigen Kick',
    priceDelta: 1.0,
  },
  roestzwiebeln: {
    id: 'roestzwiebeln',
    name: 'Knusprige Röstzwiebeln',
    description: 'Goldgelb ausgebackene Zwiebelstreifen',
    priceDelta: 1.2,
    allergens: ['A'],
  },
};
