import { menu } from './menu'

export const info = {
  name: 'Caffè Novetrequarti',
  address: 'Corso Giuseppe Garibaldi 141',
  city: '08100 Nuoro',
  phone: '+39 345 065 5428',
  phoneHref: 'tel:+393450655428',
  instagram: 'https://www.instagram.com/caffe_novetrequarti_nuoro/',
  instagramHandle: '@caffe_novetrequarti_nuoro',
  facebook: 'https://www.facebook.com/caffenovetrequartinuoro/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Caff%C3%A8+Novetrequarti+Corso+Garibaldi+141+Nuoro',
}

export const img = (name: string) => `/img/${name}.webp`

/** Hero cycler: dishes from the kitchen, as posted by guests and by the café. */
export const heroDishes = [
  { src: img('tataki-tonno-peperoni'), label: 'Tataki di tonno' },
  { src: img('polpo-piastra'), label: 'Polpo alla piastra' },
  { src: img('tartare-tonno-avocado'), label: 'Tartare di tonno' },
  { src: img('nigiri-salmone'), label: 'Nigiri di salmone' },
  { src: img('scampi-ceci'), label: 'Scampi e ceci' },
  { src: img('tataki-salmone'), label: 'Tataki di salmone' },
]

/** Carriage windows. Price only when the dish is on the current digital menu. */
export const carriage = [
  { src: img('tartare-ponzu'), name: 'Tartare di tonno in salsa ponzu', note: 'crema di zucca e semi', price: 16 },
  { src: img('carpaccio-vino'), name: 'Carpaccio di manzo', note: 'soia, limone, olio al tartufo, pistacchi', price: 16 },
  { src: img('seppiette-riso-venere'), name: 'Riso venere', note: 'seppiette alla diavola e origano', price: 16 },
  { src: img('orata-fritta'), name: 'Filetto di orata fritto', note: 'teriyaki, sesamo, maionese al wasabi', price: 16 },
  { src: img('polpo-insalata'), name: 'Polpo', note: 'rucola e nocciole', price: 16 },
  { src: img('curry-pollo'), name: 'Bocconcini di pollo', note: 'curry e latte di cocco', price: 14 },
  { src: img('burrata'), name: 'Burrata', note: 'pomodorini e basilico', price: 8 },
  { src: img('tataki-tonno-cipolle'), name: 'Tataki di tonno', note: 'cipolle caramellate' },
  { src: img('sashimi-salmone'), name: 'Sashimi di salmone', note: 'cavolo cappuccio alla soia' },
  { src: img('spaghetti-cozze'), name: 'Spaghetti alle cozze', note: 'pomodorino fresco' },
  { src: img('pasta-burrata'), name: 'Pasta, burrata e pistacchio', note: 'dal menù del giorno' },
  { src: img('pesce-pistacchio'), name: 'Pesce in crosta di pistacchio', note: 'su spinacino' },
]

export type Review = {
  from: string
  quote: string
  who: string
  when: string
  source: 'Tripadvisor' | 'Google'
  lang?: string
}

export const reviews: Review[] = [
  { from: 'Louisville, Kentucky', quote: 'Bella pausa sulla strada per Olbia da Cagliari. Il cibo era sorprendentemente ottimo.', who: 'Nana M.', when: 'lug 2024', source: 'Tripadvisor' },
  { from: 'Emilia-Romagna', quote: 'Piatti gustosi e generosi, servizio ottimo. Caffè offerto.', who: 'Marco Z.', when: 'lug 2026', source: 'Tripadvisor' },
  { from: 'Milano', quote: "Abbiamo avuto la piacevole sorpresa di gustare l'ottima e originale birra Zemyna prodotta proprio a Nuoro.", who: 'MarinaMI2013', when: 'giu 2023', source: 'Tripadvisor' },
  { from: 'San Clemente, Cuenca', quote: 'Trato exquisito y la comida insuperable.', who: 'JCV', when: 'ott 2026', source: 'Google', lang: 'es' },
  { from: 'Sardegna', quote: 'Prendo un broccolo stufato e una rana pescatrice alla catalana, impeccabili entrambi!', who: 'mandybola11', when: 'gen 2025', source: 'Tripadvisor' },
  { from: 'In famiglia', quote: 'Personale gentilissimo e disponibile nei confronti di mia figlia celiaca. Hanno portato un tagliere buonissimo e senza glutine.', who: 'Eddi M.', when: 'lug 2025', source: 'Tripadvisor' },
  { from: 'Germania', quote: 'Burrata mit gemischtem Salat war super lecker!', who: 'Carina', when: 'mag 2026', source: 'Google', lang: 'de' },
  { from: 'Pausa pranzo', quote: 'Rana pescatrice semplicemente divina e personale veramente cortese e servizio veloce.', who: 'Letizia C.', when: 'ago 2023', source: 'Tripadvisor' },
]

export type Wine = { name: string; detail: string; prices: number[] }
export type Station = { id: string; name: string; x: number; y: number; wines: Wine[]; labelSide?: 'left' | 'right' }

// Schematic map, not to scale. viewBox 0 0 360 520.
export const stations: Station[] = [
  { id: 'nuoro', name: 'Nuoro', x: 218, y: 214, wines: [] },
  { id: 'mamoiada', name: 'Mamoiada', x: 196, y: 262, labelSide: 'left', wines: [
    { name: 'Sartiu', detail: 'Cannonau · Giuseppe Sedilesu', prices: [4, 20] },
    { name: 'Mertzeoro', detail: 'Cannonau', prices: [4, 22] },
    { name: 'Zispanu', detail: 'Giuseppe Sedilesu', prices: [40] },
    { name: 'Carnevale', detail: 'Giuseppe Sedilesu', prices: [45] },
    { name: 'Mertzeoro Granatza', detail: 'Bianco', prices: [4] },
  ] },
  { id: 'orgosolo', name: 'Orgosolo', x: 228, y: 306, wines: [{ name: 'Locoe', detail: 'Cannonau · Cantina Orgosolo', prices: [4, 20] }] },
  { id: 'dorgali', name: 'Dorgali', x: 290, y: 198, wines: [
    { name: 'Thurcalesu', detail: 'Cannonau · Berritta', prices: [4, 22] },
    { name: 'Filine', detail: 'Vermentino · Cantina Dorgali', prices: [3.5, 18] },
  ] },
  { id: 'arzachena', name: 'Arzachena', x: 262, y: 52, wines: [{ name: 'Branu', detail: 'Vermentino di Gallura · Surrau', prices: [4, 20] }] },
  { id: 'luogosanto', name: 'Luogosanto', x: 208, y: 70, labelSide: 'left', wines: [{ name: 'Spera', detail: 'Vermentino di Gallura · Siddura', prices: [4, 22] }] },
  { id: 'asinara', name: 'Asinara', x: 58, y: 40, wines: [{ name: 'Indolente', detail: 'Vermentino · Tenute Asinara', prices: [4] }] },
  { id: 'alghero', name: 'Alghero', x: 62, y: 168, wines: [
    { name: 'Medeus', detail: 'Cannonau · Sella & Mosca', prices: [3.5, 18] },
    { name: 'Cagnulari', detail: 'Santa Maria La Palma', prices: [4, 20] },
    { name: 'Cala Reale', detail: 'Vermentino · Sella & Mosca', prices: [4, 20] },
    { name: 'Catore', detail: 'Torbato · Sella & Mosca', prices: [4, 22] },
    { name: 'Oscarò', detail: 'Torbato metodo classico', prices: [4.5, 25] },
    { name: 'Akenta', detail: 'Spumante di Vermentino', prices: [4, 20] },
    { name: 'Anemone', detail: 'Rosato · Sella & Mosca', prices: [4, 22] },
  ] },
  { id: 'sanluri', name: 'Sanluri', x: 128, y: 372, labelSide: 'left', wines: [{ name: 'Suditerra', detail: "Bovale · Su 'Entu", prices: [4, 20] }] },
  { id: 'serdiana', name: 'Serdiana', x: 196, y: 430, wines: [
    { name: 'Carda Nera', detail: 'Carignano del Sulcis · Argiolas', prices: [4, 20] },
    { name: 'Korem', detail: 'Bovale · Argiolas', prices: [45] },
    { name: 'Iselis', detail: 'Nasco · Argiolas', prices: [4] },
  ] },
  { id: 'santadi', name: 'Santadi', x: 104, y: 444, labelSide: 'left', wines: [{ name: 'Pedraia', detail: 'Nuragus · Santadi', prices: [4] }] },
  { id: 'arresi', name: "Sant'Anna Arresi", x: 86, y: 492, labelSide: 'right', wines: [
    { name: 'Buio', detail: 'Carignano del Sulcis · Mesa', prices: [4, 25] },
    { name: 'Brama', detail: 'Syrah · Mesa', prices: [4.5, 25] },
  ] },
]

export const lines = [
  { id: 'barbagia', name: 'Linea Barbagia', color: '#e0707a', path: 'M290 198 L218 214 L196 262 L228 306' },
  { id: 'gallura', name: 'Linea Gallura', color: '#d4a94f', path: 'M218 214 L218 120 L208 70 M218 120 L262 52' },
  { id: 'ovest', name: 'Linea Ovest', color: '#f4ead8', path: 'M218 214 L140 186 L62 168 L58 40' },
  { id: 'sud', name: 'Linea Sud', color: '#8fd18b', path: 'M218 214 L160 240 L128 372 L196 430 M128 372 L104 444 L86 492' },
]

const ginSection = menu.find((c) => c.id === 'gin')!.sections[0]
export const gins = ginSection.items

export const signatures = menu.find((c) => c.id === 'cocktail')!.sections[0].items

export const breakfast = [
  { name: 'Espresso', price: 1.3 },
  { name: 'Cappuccino', price: 1.6 },
  { name: 'Brioche o cornetto', price: 1.5 },
  { name: 'Latte macchiato', price: 1.7 },
  { name: 'Marocchino alla Nutella', price: 2.5 },
  { name: 'Ginseng', price: 2 },
  { name: 'Cioccolata calda', price: 3 },
  { name: 'Tiramisù', price: 4 },
]
