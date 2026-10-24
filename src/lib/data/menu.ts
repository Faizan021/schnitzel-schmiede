import { MenuItem } from '../types/menu';

export const MENU_ITEMS: MenuItem[] = [
  // --- SCHNITZEL KLASSIKER ---
  {
    id: 'schnitzel-wiener-art',
    name: 'Schnitzel Wiener Art',
    subtitle: 'Der unangefochtene Klassiker der Schmiede',
    description:
      'Goldbraun soufflierte Panade in reinem Butterschmalz ausgebacken, serviert mit frischer Bio-Zitrone, Preiselbeeren und knusprigen Steakhouse-Pommes.',
    price: 15.9,
    category: 'schnitzel',
    image: '/images/dishes/schnitzel-wiener-art.jpg',
    allergens: ['A', 'C'],
    tags: ['bestseller', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'schnitzel-champignon-rahm',
    name: 'Jägerschnitzel "Schmiede Art"',
    subtitle: 'Mit marktfrischen braunen Champignons',
    description:
      'Knuspriges Schnitzel mit unserer legendären Champignon-Rahmsauce (separat serviert), verfeinert mit frischen Kräutern, dazu knusprige Bratkartoffeln.',
    price: 18.5,
    category: 'schnitzel',
    image: '/images/dishes/schnitzel-champignon-rahm.jpg',
    allergens: ['A', 'C', 'G', 'I'],
    tags: ['bestseller', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'schnitzel-zigeuner',
    name: 'Paprikaschnitzel "Puszta Fire"',
    subtitle: 'Fruchtig-pikante Paprika-Zwiebel-Sauce',
    description:
      'Traditionell geschmorter Paprikasud mit Streifen von roter Spitzpaprika, Schalotten und milden Pfefferoni (separat serviert), serviert mit Steakhouse-Pommes.',
    price: 18.2,
    category: 'schnitzel',
    image: '/images/dishes/schnitzel-zigeuner.jpg',
    allergens: ['A', 'C', 'I', 'J'],
    tags: ['spicy', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'schnitzel-holstein',
    name: 'Schnitzel "Holsteinische Art"',
    subtitle: 'Mit Spiegelei & feinen Kapernäpfeln',
    description:
      'Goldgelb souffliertes Schnitzel belegt mit zwei sonnengelben Land-Spiegeleiern, knusprigen Röstzwiebeln und rheinischen Bratkartoffeln.',
    price: 19.9,
    category: 'schnitzel',
    image: '/images/dishes/schnitzel-holstein.jpg',
    allergens: ['A', 'C'],
    tags: ['chef_special', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },

  // --- SCHMIEDE SPECIALS ---
  {
    id: 'special-brauhaus-kruste',
    name: 'Mönchengladbacher Brauhaus-Schnitzel',
    subtitle: 'In Malz & Brezelkruste überbacken',
    description:
      'In hausgemachter Brezelpanade gebacken, mit würzigem Altbier-Zwiebel-Relish und mittelaltem Gouda im Ofen goldbraun gratiniert, dazu Bratkartoffeln.',
    price: 21.5,
    category: 'specials',
    image: '/images/dishes/special-brauhaus-kruste.jpg',
    allergens: ['A', 'C', 'G'],
    tags: ['chef_special', 'bestseller'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'special-schmiede-xxl-duo',
    name: 'Das Schmiede-Doppelrad (XXL 440g)',
    subtitle: 'Zwei Riesen-Schnitzel für Schmiede-Meister',
    description:
      'Für den echten Hunger: 2x 220g saftig geklopfte Schnitzel nach Wahl, doppelte Portion Pommes frites und 2 Saucen nach Wahl separat im Glas.',
    price: 26.9,
    category: 'specials',
    image: '/images/dishes/special-schmiede-xxl-duo.jpg',
    allergens: ['A', 'C', 'G', 'I'],
    tags: ['bestseller', 'halal'],
    isCustomizable: true,
    defaultPortion: '440g Doppelportion',
  },
  {
    id: 'special-veggie-delight',
    name: 'Kräuter-Schmiede Veggie Schnitzel',
    subtitle: '100% Pflanzlich auf Kichererbsen-Kräuter-Basis',
    description:
      'Hausgemachtes vegetarisches Schnitzel mit knuspriger Panko-Kruste, verfeinert mit frischem Thymian & Petersilie, serviert mit Gurkensalat und Süßkartoffelpommes.',
    price: 16.9,
    category: 'specials',
    image: '/images/dishes/special-veggie-delight.jpg',
    allergens: ['A', 'C', 'I'],
    tags: ['veggie', 'bestseller'],
    isCustomizable: true,
    defaultPortion: '200g Veggie Craft',
  },

  // --- BURGER & LOADED FRIES ---
  {
    id: 'burger-crispy-schnitzel',
    name: 'The Schmiede Schnitzel-Burger',
    subtitle: 'Im getoasteten Brioche Bun',
    description:
      'Knuspriges Hähnchen-Schnitzel im Panko-Mantel mit geschmolzenem Cheddar, knackigem Römersalat, Gurken-Relish und rauchiger Schmiede-BBQ-Sauce.',
    price: 13.9,
    category: 'burgers',
    image: '/images/dishes/burger-crispy-schnitzel.jpg',
    allergens: ['A', 'C', 'G', 'K'],
    tags: ['bestseller', 'halal'],
    defaultPortion: 'Inkl. Dip',
  },
  {
    id: 'fries-truessel-parmesan',
    name: 'Trüffel-Parmesan Loaded Fries',
    subtitle: 'Der ultimative Beilagen-Favorit',
    description:
      'Knusprige Steakhouse-Pommes geschwenkt in weißem Trüffelöl, reichlich frisch gehobeltem Grana Padano, Petersilie und hausgemachter Trüffelmayo.',
    price: 7.5,
    category: 'fries',
    image: '/images/dishes/fries-truessel-parmesan.jpg',
    allergens: ['C', 'G', 'J'],
    tags: ['bestseller', 'veggie'],
    defaultPortion: '350g Portion',
  },
  {
    id: 'fries-schmiede-loaded',
    name: 'Pulled Pork Schmiede-Fries',
    subtitle: 'Mit 14h geschmortem BBQ-Fleisch',
    description:
      'Goldene Pommes belegt mit zartem Pulled Pork, Jalapeños, warm geschmolzener Cheddar-Creme und knusprigen Röstzwiebeln.',
    price: 9.9,
    category: 'fries',
    image: '/images/dishes/fries-schmiede-loaded.jpg',
    allergens: ['A', 'G'],
    tags: ['spicy'],
    defaultPortion: '450g Mega-Portion',
  },

  // --- KIDS ---
  {
    id: 'kids-schnitzel-pirat',
    name: 'Schmiede-Zwerg Schnitzel',
    subtitle: 'Für unsere kleinen Feinschmecker',
    description:
      'Ein zartes Mini-Hähnchenschnitzel mit milder Panade, Portion knusprigen Pommes, Ketchup, Capri-Sun und einer Überraschungs-Schatztruhe.',
    price: 8.9,
    category: 'kids',
    image: '/images/dishes/kids-schnitzel-pirat.jpg',
    allergens: ['A', 'C'],
    tags: ['halal'],
    defaultPortion: 'Kinderportion',
  },

  // --- DESSERTS ---
  {
    id: 'dessert-kaiserschmarrn',
    name: 'Original Schmiede Kaiserschmarrn',
    subtitle: 'Frisch karamellisiert in der Pfanne',
    description:
      'Luftig gezupfter Teig mit Rosinen (auf Wunsch ohne), Puderzucker, dazu hausgemachter Zwetschgenröster und Bourbon-Vanilleeis.',
    price: 8.5,
    category: 'desserts',
    image: '/images/dishes/dessert-kaiserschmarrn.jpg',
    allergens: ['A', 'C', 'G'],
    tags: ['veggie', 'bestseller'],
    defaultPortion: 'Frisch zubereitet (ca. 15 Min)',
  },
  {
    id: 'dessert-apfelstrudel',
    name: 'Warmer Alt-Wiener Apfelstrudel',
    subtitle: 'Mit Rosinen & Zimtäpfeln',
    description:
      'Knuspriger Strudelteig gefüllt mit Boskoop-Äpfeln und Zimt, serviert mit heißer Vanillesauce.',
    price: 6.9,
    category: 'desserts',
    image: '/images/dishes/dessert-apfelstrudel.jpg',
    allergens: ['A', 'C', 'G'],
    tags: ['veggie'],
  },

  // --- DRINKS ---
  {
    id: 'drink-fritz-kola',
    name: 'Fritz-Kola Original 0.33l',
    description: 'Viel Koffein, unverwechselbarer Geschmack im Glas-Mehrweg.',
    price: 3.2,
    category: 'drinks',
    image: '/images/dishes/drink-fritz-kola.jpg',
    allergens: [],
    tags: ['veggie'],
    defaultPortion: '0.33l Glas',
  },
  {
    id: 'drink-bolten-alt',
    name: 'Bolten Alt Mönchengladbach 0.5l',
    description:
      'Das älteste Altbier der Welt, frisch und hefeblumig aus der Region Korschenbroich / Mönchengladbach.',
    price: 4.2,
    category: 'drinks',
    image: '/images/dishes/drink-bolten-alt.jpg',
    allergens: ['A'],
    tags: ['bestseller'],
    defaultPortion: '0.5l Flasche',
  },
  {
    id: 'drink-vio-mineralwasser',
    name: 'Vio Mineralwasser (Still / Sprudel) 0.5l',
    description: 'Erfrischendes natürliches Mineralwasser aus der Region.',
    price: 2.9,
    category: 'drinks',
    image: '/images/dishes/drink-vio-mineralwasser.jpg',
    allergens: [],
    tags: ['veggie'],
    defaultPortion: '0.5l Flasche',
  },
];
