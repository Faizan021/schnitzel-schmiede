import { MenuItem } from '../types/menu';

export const MENU_ITEMS: MenuItem[] = [
  // --- SCHNITZEL KLASSIKER ---
  {
    id: 'schnitzel-wiener-art',
    name: 'Schnitzel Wiener Art',
    nameEn: 'Schnitzel Wiener Art',
    subtitle: 'Der unangefochtene Klassiker der Schmiede',
    subtitleEn: 'The undisputed classic of the Forge',
    description:
      'Goldbraun soufflierte Panade in reinem Butterschmalz ausgebacken, serviert mit frischer Bio-Zitrone, Preiselbeeren und knusprigen Bratkartoffeln.',
    descriptionEn:
      'Golden souffléed crust fried in clarified butter, served with fresh organic lemon, lingonberries, and crispy pan-fried potatoes.',
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
    nameEn: 'Hunter Schnitzel "Forge Style"',
    subtitle: 'Mit marktfrischen braunen Champignons',
    subtitleEn: 'With market-fresh brown mushrooms',
    description:
      'Knuspriges Schnitzel mit unserer legendären Champignon-Rahmsauce (separat serviert), verfeinert mit frischen Kräutern, dazu knusprige Bratkartoffeln.',
    descriptionEn:
      'Crispy schnitzel with our legendary mushroom cream sauce (served separately), finished with fresh herbs and pan-fried potatoes.',
    price: 18.5,
    category: 'schnitzel',
    allergens: ['A', 'C', 'G', 'I'],
    tags: ['bestseller', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'schnitzel-zigeuner',
    name: 'Paprikaschnitzel "Puszta Fire"',
    nameEn: 'Bell Pepper Schnitzel "Puszta Fire"',
    subtitle: 'Fruchtig-pikante Paprika-Zwiebel-Sauce',
    subtitleEn: 'Fruity & piquant bell pepper & onion sauce',
    description:
      'Traditionell geschmorter Paprikasud mit Streifen von roter Spitzpaprika, Schalotten und milden Pfefferoni (separat serviert), serviert mit Steakhouse-Pommes.',
    descriptionEn:
      'Traditional braised bell pepper reduction with red peppers, shallots, and mild pickled peppers (served separately), with steakhouse fries.',
    price: 18.2,
    category: 'schnitzel',
    allergens: ['A', 'C', 'I', 'J'],
    tags: ['spicy', 'halal'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'schnitzel-holstein',
    name: 'Schnitzel "Holsteinische Art"',
    nameEn: 'Schnitzel "Holstein Style"',
    subtitle: 'Mit Spiegelei & feinen Kapernäpfeln',
    subtitleEn: 'With fried eggs & caper berries',
    description:
      'Goldgelb souffliertes Schnitzel belegt mit zwei sonnengelben Land-Spiegeleiern, knusprigen Röstzwiebeln und rheinischen Bratkartoffeln.',
    descriptionEn:
      'Golden souffléed schnitzel topped with two farm-fresh sunny side up eggs, crispy fried onions, and Rhenish roast potatoes.',
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
    nameEn: 'Mönchengladbach Brewery Schnitzel',
    subtitle: 'In Malz & Brezelkruste überbacken',
    subtitleEn: 'Baked in a malt & pretzel crust',
    description:
      'In hausgemachter Brezelpanade gebacken, mit würzigem Altbier-Zwiebel-Relish und mittelaltem Gouda im Ofen goldbraun gratiniert, dazu Bratkartoffeln.',
    descriptionEn:
      'Crusted in homemade pretzel crumbs, topped with tangy Altbier onion relish, and gratinéed with aged Gouda cheese, served with roast potatoes.',
    price: 21.5,
    category: 'specials',
    image: '/images/dishes/special-brauhaus-kruste.jpg',
    allergens: ['A', 'C', 'G'],
    tags: ['chef_special', 'bestseller'],
    isCustomizable: true,
    defaultPortion: '220g Frischfleisch',
  },
  {
    id: 'crunch-haehnchen-salat',
    name: 'Schmiede Knusper-Salat',
    nameEn: 'Forge Crispy Chicken Salad Bowl',
    subtitle: 'Mit goldbraun soufflierten Hähnchenstreifen',
    subtitleEn: 'With golden souffléed chicken strips',
    description:
      'Frischer bunter Marktsalat mit Radieschen, Gurken, Tomaten und kross panierten Hähnchenstreifen aus reinem Butterschmalz, serviert mit feinem Kräuter-Dressing.',
    descriptionEn:
      'Fresh colorful market salad with crisp radishes, cucumbers, tomatoes, and golden breaded chicken tenders fried in clarified butter, with house herb dressing.',
    price: 14.5,
    category: 'specials',
    image: '/images/dishes/crunch-haehnchen-salat.jpg',
    allergens: ['A', 'C', 'G', 'J'],
    tags: ['bestseller', 'halal'],
    defaultPortion: 'Große Salatschale',
  },
  {
    id: 'special-schmiede-xxl-duo',
    name: 'Das Schmiede-Doppelrad (XXL 440g)',
    nameEn: 'The Forge Double Wheel (XXL 440g)',
    subtitle: 'Zwei Riesen-Schnitzel für Schmiede-Meister',
    subtitleEn: 'Two giant schnitzels for true master blacksmiths',
    description:
      'Für den echten Hunger: 2x 220g saftig geklopfte Schnitzel nach Wahl, doppelte Portion Pommes frites und 2 Saucen nach Wahl separat im Glas.',
    descriptionEn:
      'For hearty appetites: 2x 220g freshly tenderized schnitzels of your choice, double portion of fries, and 2 sauces served separately.',
    price: 26.9,
    category: 'specials',
    allergens: ['A', 'C', 'G', 'I'],
    tags: ['bestseller', 'halal'],
    isCustomizable: true,
    defaultPortion: '440g Doppelportion',
  },
  {
    id: 'special-veggie-delight',
    name: 'Kräuter-Schmiede Veggie Schnitzel',
    nameEn: 'Herb-Crusted Forge Veggie Schnitzel',
    subtitle: '100% Pflanzlich auf Kichererbsen-Kräuter-Basis',
    subtitleEn: '100% plant-based chickpea & herb cutlet',
    description:
      'Hausgemachtes vegetarisches Schnitzel mit knuspriger Panko-Kruste, verfeinert mit frischem Thymian & Petersilie, serviert mit Gurkensalat und Süßkartoffelpommes.',
    descriptionEn:
      'Artisanal plant-based schnitzel with a crunchy panko crust, infused with fresh thyme & parsley, served with cucumber salad and sweet potato fries.',
    price: 16.9,
    category: 'specials',
    allergens: ['A', 'C', 'I'],
    tags: ['veggie', 'bestseller'],
    isCustomizable: true,
    defaultPortion: '200g Veggie Craft',
  },

  // --- BURGER & LOADED FRIES ---
  {
    id: 'burger-crispy-schnitzel',
    name: 'The Schmiede Schnitzel-Burger',
    nameEn: 'The Forge Schnitzel Burger',
    subtitle: 'Im getoasteten Brioche Bun',
    subtitleEn: 'Served on a toasted brioche bun',
    description:
      'Knuspriges Hähnchen-Schnitzel im Panko-Mantel mit geschmolzenem Cheddar, knackigem Römersalat, Gurken-Relish und rauchiger Schmiede-BBQ-Sauce.',
    descriptionEn:
      'Crispy panko chicken schnitzel with melted cheddar, crisp romaine lettuce, pickle relish, and smoky Forge BBQ sauce.',
    price: 13.9,
    category: 'burgers',
    allergens: ['A', 'C', 'G', 'K'],
    tags: ['bestseller', 'halal'],
    defaultPortion: 'Inkl. Dip',
  },
  {
    id: 'fries-truessel-parmesan',
    name: 'Trüffel-Parmesan Loaded Fries',
    nameEn: 'Truffle-Parmesan Loaded Fries',
    subtitle: 'Der ultimative Beilagen-Favorit',
    subtitleEn: 'The ultimate side dish favorite',
    description:
      'Knusprige Steakhouse-Pommes geschwenkt in weißem Trüffelöl, reichlich frisch gehobeltem Grana Padano, Petersilie und hausgemachter Trüffelmayo.',
    descriptionEn:
      'Crispy steakhouse fries tossed in white truffle oil, topped with shaved Grana Padano, fresh parsley, and house truffle aioli.',
    price: 7.5,
    category: 'fries',
    allergens: ['C', 'G', 'J'],
    tags: ['bestseller', 'veggie'],
    defaultPortion: '350g Portion',
  },
  {
    id: 'fries-schmiede-loaded',
    name: 'Pulled Pork Schmiede-Fries',
    nameEn: 'Forge Pulled Pork Loaded Fries',
    subtitle: 'Mit 14h geschmortem BBQ-Fleisch',
    subtitleEn: 'With 14-hour slow-cooked BBQ pork',
    description:
      'Goldene Pommes belegt mit zartem Pulled Pork, Jalapeños, warm geschmolzener Cheddar-Creme und knusprigen Röstzwiebeln.',
    descriptionEn:
      'Golden fries topped with tender pulled pork, sliced jalapeños, warm melted cheddar cream, and crispy fried onions.',
    price: 9.9,
    category: 'fries',
    allergens: ['A', 'G'],
    tags: ['spicy'],
    defaultPortion: '450g Mega-Portion',
  },

  // --- KIDS ---
  {
    id: 'kids-schnitzel-pirat',
    name: 'Schmiede-Zwerg Schnitzel',
    nameEn: 'Little Blacksmith Schnitzel',
    subtitle: 'Für unsere kleinen Feinschmecker',
    subtitleEn: 'For our young gourmet explorers',
    description:
      'Ein zartes Mini-Hähnchenschnitzel mit milder Panade, Portion knusprigen Pommes, Ketchup, Capri-Sun und einer Überraschungs-Schatztruhe.',
    descriptionEn:
      'Tender mini chicken schnitzel with mild crumb, crispy french fries, ketchup, Capri-Sun drink, and a surprise treasure toy.',
    price: 8.9,
    category: 'kids',
    allergens: ['A', 'C'],
    tags: ['halal'],
    defaultPortion: 'Kinderportion',
  },

  // --- DESSERTS ---
  {
    id: 'dessert-kaiserschmarrn',
    name: 'Original Schmiede Kaiserschmarrn',
    nameEn: 'Original Forge Kaiserschmarrn',
    subtitle: 'Frisch karamellisiert in der Pfanne',
    subtitleEn: 'Freshly caramelized in the pan',
    description:
      'Luftig gezupfter Teig mit Rosinen (auf Wunsch ohne), Puderzucker, dazu hausgemachter Zwetschgenröster und Bourbon-Vanilleeis.',
    descriptionEn:
      'Fluffy torn Austrian pancake with raisins, powdered sugar, homemade stewed plum compote, and bourbon vanilla ice cream.',
    price: 8.5,
    category: 'desserts',
    allergens: ['A', 'C', 'G'],
    tags: ['veggie', 'bestseller'],
    defaultPortion: 'Frisch zubereitet (ca. 15 Min)',
  },
  {
    id: 'dessert-apfelstrudel',
    name: 'Warmer Alt-Wiener Apfelstrudel',
    nameEn: 'Warm Viennese Apple Strudel',
    subtitle: 'Mit Rosinen & Zimtäpfeln',
    subtitleEn: 'With raisins & cinnamon apples',
    description:
      'Knuspriger Strudelteig gefüllt mit Boskoop-Äpfeln und Zimt, serviert mit heißer Vanillesauce.',
    descriptionEn:
      'Crispy delicate pastry filled with spiced Boskoop apples and cinnamon, served with hot vanilla custard.',
    price: 6.9,
    category: 'desserts',
    allergens: ['A', 'C', 'G'],
    tags: ['veggie'],
  },

  // --- DRINKS ---
  {
    id: 'drink-fritz-kola',
    name: 'Fritz-Kola Original 0.33l',
    nameEn: 'Fritz-Kola Original 0.33l',
    description: 'Viel Koffein, unverwechselbarer Geschmack im Glas-Mehrweg.',
    descriptionEn: 'High caffeine craft cola, distinct taste in returnable glass bottle.',
    price: 3.2,
    category: 'drinks',
    allergens: [],
    tags: ['veggie'],
    defaultPortion: '0.33l Glas',
  },
  {
    id: 'drink-bolten-alt',
    name: 'Bolten Alt Mönchengladbach 0.5l',
    nameEn: 'Bolten Alt Mönchengladbach Beer 0.5l',
    description:
      'Das älteste Altbier der Welt, frisch und hefeblumig aus der Region Korschenbroich / Mönchengladbach.',
    descriptionEn:
      'The world’s oldest traditional Altbier, fresh and aromatic from the local Mönchengladbach region.',
    price: 4.2,
    category: 'drinks',
    allergens: [],
    tags: ['bestseller'],
    defaultPortion: '0.5l Flasche',
  },
  {
    id: 'drink-vio-mineralwasser',
    name: 'Vio Mineralwasser (Still / Sprudel) 0.5l',
    nameEn: 'Vio Mineral Water (Still / Sparkling) 0.5l',
    description: 'Erfrischendes natürliches Mineralwasser aus der Region.',
    descriptionEn: 'Refreshing natural local mineral water.',
    price: 2.9,
    category: 'drinks',
    allergens: [],
    tags: ['veggie'],
    defaultPortion: '0.5l Flasche',
  },
];
