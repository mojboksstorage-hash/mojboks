// =============================================
// FIREBASE KONFIGURACIJA - MojBoks
// =============================================
// VAŽNO: Ove vrednosti ćeš zameniti TVOJIM vrednostima iz Firebase konzole
// Pogledaj uputstvo u README.txt kako da dobiješ ove podatke

const firebaseConfig = {
  apiKey: "AIzaSyCzuDqiL3q4a2CkTPJpB-Odpauqi21x8F8",
  authDomain: "mojboks-3445e.firebaseapp.com",
  projectId: "mojboks-3445e",
  storageBucket: "mojboks-3445e.firebasestorage.app",
  messagingSenderId: "920773616815",
  appId: "1:920773616815:web:8dbee2a99409c17896205a"
};

// Inicijalizacija Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// =============================================
// PODACI - OPŠTINE SRBIJE
// =============================================
const OPSTINE_SRBIJE = [
  "Ada", "Aleksandrovac", "Aleksinac", "Alibunar", "Apatin", "Aranđelovac",
  "Arilje", "Babušnica", "Bač", "Bačka Palanka", "Bačka Topola", "Bačko Petrovo Selo",
  "Bajina Bašta", "Batočina", "Bela Crkva", "Bela Palanka", "Beočin", "Beograd - Barajevo",
  "Beograd - Voždovac", "Beograd - Vračar", "Beograd - Grocka", "Beograd - Zvezdara",
  "Beograd - Zemun", "Beograd - Lazarevac", "Beograd - Mladenovac", "Beograd - Novi Beograd",
  "Beograd - Obrenovac", "Beograd - Palilula", "Beograd - Rakovica", "Beograd - Savski venac",
  "Beograd - Sopot", "Beograd - Stari grad", "Beograd - Surčin", "Beograd - Čukarica",
  "Blace", "Bogatic", "Bojnik", "Boljevac", "Bor", "Bosilegrad", "Brus", "Bujanovac",
  "Valjevo", "Varoš", "Velika Plana", "Veliko Gradište", "Vladičin Han", "Vladimirci",
  "Vlasotince", "Vranje", "Vranjska Banja", "Vrbas", "Vrnjačka Banja", "Vršac",
  "Gadžin Han", "Golubac", "Gornji Milanovac", "Despotovac", "Dimitrovgrad", "Doljevac",
  "Žabalj", "Žabari", "Žagubica", "Žitište", "Žitorađa", "Zaječar", "Zemun",
  "Zrenjanin", "Ivanjica", "Inđija", "Irig", "Jagodina", "Kanjiža", "Kikinda",
  "Kladovo", "Kljajićevo", "Knić", "Knjaževac", "Kovin", "Kosjerić", "Kostolac",
  "Kragujevac", "Kralevo", "Krupanj", "Kruševac", "Kuršumlija", "Kučevo", "Lajkovac",
  "Lapovo", "Lebane", "Leskovac", "Loznica", "Lučani", "Ljubovija", "Majdanpek",
  "Mali Iđoš", "Mali Zvornik", "Malo Crniće", "Medveđa", "Merošina", "Mionica",
  "Mladenovac", "Negotin", "Niš - Crveni krst", "Niš - Medijana", "Niš - Niška Banja",
  "Niš - Palilula", "Niš - Pantelej", "Nova Crnja", "Nova Varoš", "Novi Bečej",
  "Novi Knežević", "Novi Pazar", "Novi Sad - Grad", "Novi Sad - Petrovaradin",
  "Odžaci", "Opovo", "Osečina", "Pančevo", "Paraćin", "Petrovac na Mlavi",
  "Pećinci", "Pirot", "Plandište", "Požarevac", "Požega", "Preševo", "Priboj",
  "Prijepolje", "Prokuplje", "Rača", "Raška", "Ražanj", "Rekovac", "Ruma",
  "Senta", "Sečanj", "Sjenica", "Smederevo", "Smederevska Palanka", "Sokobanja",
  "Sombor", "Srbobran", "Sremska Mitrovica", "Sremski Karlovci", "Stara Pazova",
  "Subotica", "Surdulica", "Svilajnac", "Svrljig", "Temerin", "Titel",
  "Topola", "Trgovište", "Trstenik", "Tutin", "Ćićevac", "Ćuprija",
  "Uб", "Užice", "Čačak", "Čoka", "Šabac", "Šid"
];

const TIPOVI_SKLADISTA = [
  { value: "kontejneri_garaze", sr: "Skladištenje u prilagođenim kontejnerima/garažama", en: "Adapted containers/garages storage" },
  { value: "blok_industrijsko", sr: "Blok industrijsko skladište", en: "Block industrial warehouse" },
  { value: "regalno_industrijsko", sr: "Regalno industrijsko skladište", en: "Rack industrial warehouse" },
  { value: "rasuti_teret", sr: "Skladište rasutog tereta", en: "Bulk cargo warehouse" },
  { value: "ostalo", sr: "Ostalo", en: "Other" }
];

const TIPOVI_ROBE = [
  { value: "generalna", sr: "Generalna roba", en: "General goods" },
  { value: "lako_kvarljiva", sr: "Lako kvarljiva roba", en: "Perishable goods" },
  { value: "sirovine_rasuti", sr: "Sirovine i rasuti materijali", en: "Raw materials & bulk" },
  { value: "zamrznuta", sr: "Zamrznuta roba", en: "Frozen goods" },
  { value: "opasna", sr: "Opasna roba", en: "Hazardous goods" },
  { value: "farmaceutski", sr: "Farmaceutski i medicinski proizvodi", en: "Pharmaceutical & medical" },
  { value: "hrana_konditorski", sr: "Hrana i konditorski proizvodi", en: "Food & confectionery" },
  { value: "ostalo", sr: "Ostalo", en: "Other" }
];

const DODATNE_USLUGE = [
  { value: "3pl", sr: "3PL usluge", en: "3PL services" },
  { value: "paletizacija", sr: "Paletizacija", en: "Palletization" },
  { value: "komisioniranje", sr: "Komisioniranje", en: "Commissioning/Picking" },
  { value: "sortiranje", sr: "Sortiranje", en: "Sorting" },
  { value: "deklarisanje", sr: "Deklarisanje", en: "Labeling/Declaration" },
  { value: "pakovanje", sr: "Pakovanje", en: "Packaging" },
  { value: "ostalo", sr: "Ostalo", en: "Other" }
];
