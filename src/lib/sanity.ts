import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '7f3j0z2i',
  dataset: 'production',
  apiVersion: '2024-05-01',
  useCdn: true, // Cached CDN reads — perfect for static build
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// =====================================================================
// Kontakt — singleton document with id 'kontakt'
// =====================================================================
export type Kontakt = {
  telefon: string;
  telefonRaw: string;
  epost: string;
  adresseLinje: string;
  apningstider?: {
    manTor?: string;
    fredag?: string;
    helg?: string;
  };
};

const KONTAKT_FALLBACK: Kontakt = {
  telefon: '955 23 763',
  telefonRaw: '+4795523763',
  epost: 'post@murmesterhenriksen.no',
  adresseLinje: 'Vear, 3173 Tønsberg · Vestfold',
  apningstider: {
    manTor: '07:00–15:30',
    fredag: '07:00–13:00',
    helg: 'Stengt',
  },
};

export async function getKontakt(): Promise<Kontakt> {
  try {
    const data = await client.fetch<Kontakt | null>(
      `*[_type == "kontakt" && _id == "kontakt"][0]{
        telefon, telefonRaw, epost, adresseLinje, apningstider
      }`
    );
    return data ?? KONTAKT_FALLBACK;
  } catch (err) {
    console.warn('[sanity] kontakt fetch failed, using fallback', err);
    return KONTAKT_FALLBACK;
  }
}

// =====================================================================
// Hero — singleton document with id 'hero'
// =====================================================================
export type Hero = {
  welcome: string;
  title: string;
  titleEmphasis: string;
  signature: string;
  primaryCtaText: string;
  secondaryCtaText: string;
};

const HERO_FALLBACK: Hero = {
  welcome: 'Velkommen til Murmester Henriksen',
  title: 'Alle trenger',
  titleEmphasis: 'en murer!',
  signature: '',
  primaryCtaText: 'Kontakt oss',
  secondaryCtaText: 'Se tjenestene',
};

export async function getHero(): Promise<Hero> {
  try {
    const data = await client.fetch<Hero | null>(
      `*[_type == "hero" && _id == "hero"][0]{
        welcome, title, titleEmphasis, signature, primaryCtaText, secondaryCtaText
      }`
    );
    return data ?? HERO_FALLBACK;
  } catch (err) {
    console.warn('[sanity] hero fetch failed, using fallback', err);
    return HERO_FALLBACK;
  }
}

// =====================================================================
// Tjenester (services)
// =====================================================================
export type Tjeneste = {
  _id: string;
  nummer: string;
  tittel: string;
  slug: { current: string };
  kortLede?: string;
  subheroBilde?: any;
  artikkelH2?: string;
  artikkelInnhold?: any[]; // Portable Text blocks
  rekkefolge?: number;
};

// Hard-coded fallback list mirrors the current site exactly so the
// page keeps working before Vincent fills in Sanity.
const TJENESTER_FALLBACK: Tjeneste[] = [
  { _id: 'fb-01', nummer: '01', tittel: 'Teglforblending og muring', slug: { current: 'teglforblending' }, kortLede: 'Leverer alt innen teglforblending, leca, thermomur og mer.', rekkefolge: 1 },
  { _id: 'fb-02', nummer: '02', tittel: 'Puss', slug: { current: 'puss' }, kortLede: 'Mørtelpuss, fasadepuss, fiberpuss, finpuss — det aller meste innen overflatebehandling til mur.', rekkefolge: 2 },
  { _id: 'fb-03', nummer: '03', tittel: 'Restaurering av murverk', slug: { current: 'restaurering-av-murverk' }, kortLede: 'Restaurering av eldre murverk med hydraulisk kalk og mer.', rekkefolge: 3 },
  { _id: 'fb-04', nummer: '04', tittel: 'Rehabilitering av pipe', slug: { current: 'rehabilitering-av-pipe' }, kortLede: 'Rehabilitering av eldre skorsteiner som er underkjent av feiervesenet.', rekkefolge: 4 },
  { _id: 'fb-05', nummer: '05', tittel: 'Elementpipe & stålpipe', slug: { current: 'elementpipe' }, kortLede: 'Oppføring av elementpipe og stålpipe fra A til Å, inkludert søknadsarbeid.', rekkefolge: 5 },
  { _id: 'fb-06', nummer: '06', tittel: 'Peis & vedovn', slug: { current: 'peis-og-vedovn' }, kortLede: 'Montering av vedovner, peisinnsatser og brannforebyggende tiltak.', rekkefolge: 6 },
  { _id: 'fb-07', nummer: '07', tittel: 'Flislegging & våtrom', slug: { current: 'flislegging-og-vatrom' }, kortLede: 'Flislegging og membran til bad og andre våtromssoner.', rekkefolge: 7 },
  { _id: 'fb-08', nummer: '08', tittel: 'Sparkling og gulvavretting', slug: { current: 'sparkling-og-gulvavretting' }, kortLede: 'Gulvavretting og sparkling for privatkunder.', rekkefolge: 8 },
  { _id: 'fb-09', nummer: '09', tittel: 'Skifer & naturstein', slug: { current: 'skifer-og-naturstein' }, kortLede: 'Legging av skifer eller naturstein i alle former og fasonger.', rekkefolge: 9 },
];

export async function getTjenester(): Promise<Tjeneste[]> {
  try {
    const data = await client.fetch<Tjeneste[]>(
      `*[_type == "tjeneste"] | order(rekkefolge asc, nummer asc){
        _id, nummer, tittel, slug, kortLede, subheroBilde, artikkelH2, artikkelInnhold, rekkefolge
      }`
    );
    return data && data.length > 0 ? data : TJENESTER_FALLBACK;
  } catch (err) {
    console.warn('[sanity] tjenester fetch failed, using fallback', err);
    return TJENESTER_FALLBACK;
  }
}

// =====================================================================
// Prosjekter (projects)
// =====================================================================
export type Prosjekt = {
  _id: string;
  tittel: string;
  bilde?: any;
  bildeUrl?: string; // Used when fallback is in play
  sted?: string;
  aar?: string;
  rekkefolge?: number;
};

// Fallback list mirrors current static project files in /assets/projects/
const PROSJEKTER_FALLBACK: Prosjekt[] = [
  { _id: 'fb-p01', tittel: 'Pussfasade på sokkel', bildeUrl: '/assets/projects/project-01.jpg', rekkefolge: 1 },
  { _id: 'fb-p02', tittel: 'Murverk', bildeUrl: '/assets/projects/project-02.jpg', rekkefolge: 2 },
  { _id: 'fb-p03', tittel: 'Restaurert murverk', bildeUrl: '/assets/projects/project-03.jpg', rekkefolge: 3 },
  { _id: 'fb-p04', tittel: 'Peis', bildeUrl: '/assets/projects/project-04.jpg', rekkefolge: 4 },
  { _id: 'fb-p05', tittel: 'Pipe-rehabilitering', bildeUrl: '/assets/projects/project-05.jpg', rekkefolge: 5 },
  { _id: 'fb-p06', tittel: 'Teglforblending', bildeUrl: '/assets/projects/project-06.jpg', rekkefolge: 6 },
  { _id: 'fb-p07', tittel: 'Flislegging', bildeUrl: '/assets/projects/project-07.jpg', rekkefolge: 7 },
  { _id: 'fb-p08', tittel: 'Sparkling og gulvavretting', bildeUrl: '/assets/projects/project-08.jpg', rekkefolge: 8 },
  { _id: 'fb-p09', tittel: 'Skifer og naturstein', bildeUrl: '/assets/projects/project-09.jpg', rekkefolge: 9 },
  { _id: 'fb-p10', tittel: 'Murverk', bildeUrl: '/assets/projects/project-10.jpg', rekkefolge: 10 },
  { _id: 'fb-p11', tittel: 'Murverk', bildeUrl: '/assets/projects/project-11.jpg', rekkefolge: 11 },
  { _id: 'fb-p12', tittel: 'Elementpipe', bildeUrl: '/assets/projects/project-12.jpg', rekkefolge: 12 },
];

export async function getProsjekter(): Promise<Prosjekt[]> {
  try {
    const data = await client.fetch<Prosjekt[]>(
      `*[_type == "prosjekt"] | order(rekkefolge asc){
        _id, tittel, bilde, sted, aar, rekkefolge
      }`
    );
    return data && data.length > 0 ? data : PROSJEKTER_FALLBACK;
  } catch (err) {
    console.warn('[sanity] prosjekter fetch failed, using fallback', err);
    return PROSJEKTER_FALLBACK;
  }
}

// Helper: get image src for a project (works for both Sanity and fallback)
export function prosjektImageSrc(p: Prosjekt): string {
  if (p.bildeUrl) return p.bildeUrl;
  if (p.bilde) return urlFor(p.bilde).width(800).url();
  return '';
}

// =====================================================================
// Founder / Murmester-seksjon — singleton 'founder'
// =====================================================================
export type Chip = { tall: string; label: string; ikon: 'clock' | 'trophy' | 'grid' | 'pin' };
export type Founder = {
  kicker: string;
  portrett?: any;
  tittel: string;
  tittelAksent: string;
  tittelSlutt: string;
  lede: string;
  chips: Chip[];
  lesMerTekst: string;
};

const FOUNDER_FALLBACK: Founder = {
  kicker: 'Murmester · Vear, Vestfold · etablert 2025',
  tittel: 'Murmester',
  tittelAksent: 'Henriksen',
  tittelSlutt: '',
  lede: 'Murmester Henriksen AS ble etablert med et enkelt mål – å levere håndverk av høyeste kvalitet, kombinert med god kommunikasjon, faglig kompetanse og personlig oppfølging. Som kunde møter du alltid fagpersonen som planlegger, prosjekterer og utfører arbeidet.',
  chips: [
    { tall: '10+', label: 'år i faget', ikon: 'clock' },
    { tall: '2014', label: 'NM-sølv i muring', ikon: 'trophy' },
    { tall: '5', label: 'fagområder', ikon: 'grid' },
    { tall: 'Vestfold', label: 'hele fylket', ikon: 'pin' },
  ],
  lesMerTekst: 'Les mer om oss',
};

export async function getFounder(): Promise<Founder> {
  try {
    const data = await client.fetch<Founder | null>(
      `*[_type == "founder" && _id == "founder"][0]{
        kicker, portrett, tittel, tittelAksent, tittelSlutt, lede, chips, lesMerTekst
      }`
    );
    return data ?? FOUNDER_FALLBACK;
  } catch (err) {
    console.warn('[sanity] founder fetch failed, using fallback', err);
    return FOUNDER_FALLBACK;
  }
}

// =====================================================================
// Testimonials — singleton 'testimonials'
// =====================================================================
export type Sitat = { tekst: string; navn: string; meta?: string };
export type Testimonials = {
  kicker: string;
  tittel: string;
  tittelAksent: string;
  tittelSlutt: string;
  sitater: Sitat[];
};

const TESTIMONIALS_FALLBACK: Testimonials = {
  kicker: 'Anbefalinger',
  tittel: 'Hva kundene',
  tittelAksent: 'faktisk sier',
  tittelSlutt: '',
  sitater: [],
};

export async function getTestimonials(): Promise<Testimonials> {
  try {
    const data = await client.fetch<Testimonials | null>(
      `*[_type == "testimonials" && _id == "testimonials"][0]{
        kicker, tittel, tittelAksent, tittelSlutt, sitater
      }`
    );
    return data ?? TESTIMONIALS_FALLBACK;
  } catch (err) {
    return TESTIMONIALS_FALLBACK;
  }
}

// =====================================================================
// Areas — singleton 'areas'
// =====================================================================
export type Areas = {
  tittel: string;
  tittelAksent: string;
  tittelSlutt: string;
  byer: string[];
};

const AREAS_FALLBACK: Areas = {
  tittel: 'Vi dekker hele',
  tittelAksent: 'Vestfold',
  tittelSlutt: '',
  byer: ['Hvasser', 'Nøtterøy', 'Tønsberg', 'Larvik', 'Tjøme', 'Sandefjord', 'Horten', 'Skoppum', 'Sande', 'Stokke'],
};

export async function getAreas(): Promise<Areas> {
  try {
    const data = await client.fetch<Areas | null>(
      `*[_type == "areas" && _id == "areas"][0]{ tittel, tittelAksent, tittelSlutt, byer }`
    );
    return data ?? AREAS_FALLBACK;
  } catch (err) {
    return AREAS_FALLBACK;
  }
}

// =====================================================================
// CTA strip — singleton 'cta'
// =====================================================================
export type CTA = {
  kicker: string;
  tittel: string;
  tittelAksent: string;
  tittelSlutt: string;
  primarBtnTekst: string;
  ringBtnTekst: string;
};

const CTA_FALLBACK: CTA = {
  kicker: 'Klar for å starte?',
  tittel: 'La oss',
  tittelAksent: 'se på jobben',
  tittelSlutt: '.',
  primarBtnTekst: 'Kontakt oss',
  ringBtnTekst: 'Ring 955 23 763',
};

export async function getCTA(): Promise<CTA> {
  try {
    const data = await client.fetch<CTA | null>(
      `*[_type == "cta" && _id == "cta"][0]{ kicker, tittel, tittelAksent, tittelSlutt, primarBtnTekst, ringBtnTekst }`
    );
    return data ?? CTA_FALLBACK;
  } catch (err) {
    return CTA_FALLBACK;
  }
}

// =====================================================================
// Footer — singleton 'footer'
// =====================================================================
export type Footer = {
  firmanavn: string;
  firmaadresse: string;
  tagline: string;
  medlemTekst: string;
  facebookUrl: string;
  instagramUrl: string;
};

const FOOTER_FALLBACK: Footer = {
  firmanavn: 'Murmester Henriksen AS',
  firmaadresse: 'Vear, Vestfold',
  tagline: 'Murmester · Etablert 2025 · NM-sølv 2014',
  medlemTekst: 'Medlem · Norges Murmesterforening',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61573745327073',
  instagramUrl: 'https://www.instagram.com/murmesterhenriksen/',
};

export async function getFooter(): Promise<Footer> {
  try {
    const data = await client.fetch<Footer | null>(
      `*[_type == "footer" && _id == "footer"][0]{ firmanavn, firmaadresse, tagline, medlemTekst, facebookUrl, instagramUrl }`
    );
    return data ?? FOOTER_FALLBACK;
  } catch (err) {
    return FOOTER_FALLBACK;
  }
}

// =====================================================================
// Om oss-siden — singleton 'omOss'
// =====================================================================
export type Fakta = { label: string; verdi: string };
export type OmOss = {
  kicker: string;
  subheroBilde?: any;
  portrettKortBilde?: any;
  portrettKortNavn: string;
  portrettKortRolle: string;
  h1: string;
  h1Aksent: string;
  h1Slutt: string;
  subheroLede: string;
  innhold?: any[]; // Portable Text
  nokkelfakta: Fakta[];
};

const OM_OSS_FALLBACK: OmOss = {
  kicker: 'Om oss',
  portrettKortNavn: 'Vincent Henriksen',
  portrettKortRolle: 'Murmester · Fagskoleingeniør · Oldermann',
  h1: 'Vincent',
  h1Aksent: 'Henriksen',
  h1Slutt: '',
  subheroLede: 'Murmester | Fagskoleingeniør | Oldermann | Faglig veileder.\n<strong>Norges nest beste murer</strong> i 2014.',
  innhold: undefined,
  nokkelfakta: [
    { label: 'Svennebrev', verdi: 'Murfaget · 2014' },
    { label: 'Mesterskap', verdi: 'NM-sølv 2014' },
    { label: 'Murmester', verdi: '2022' },
    { label: 'Fagskoleingeniør', verdi: '2022' },
    { label: 'Verv', verdi: 'Oldermann · Vestfold Murmesterlaug (2025–)' },
    { label: 'Prøvenemnd', verdi: 'Koordinator & sensor, Mur- og flisleggerfaget i Vestfold (2019–)' },
    { label: 'Bedrift', verdi: 'Murmester Henriksen AS · Etablert 2025' },
    { label: 'Område', verdi: 'Hele Vestfold' },
    { label: 'Medlem', verdi: 'Norges Murmesterforening' },
  ],
};

export async function getOmOss(): Promise<OmOss> {
  try {
    const data = await client.fetch<OmOss | null>(
      `*[_type == "omOss" && _id == "omOss"][0]{
        kicker, subheroBilde, portrettKortBilde, portrettKortNavn, portrettKortRolle,
        h1, h1Aksent, h1Slutt, subheroLede, innhold, nokkelfakta
      }`
    );
    return data ?? OM_OSS_FALLBACK;
  } catch (err) {
    return OM_OSS_FALLBACK;
  }
}

// =====================================================================
// Kontakt-siden (tekster) — singleton 'kontaktPage'
// =====================================================================
export type KontaktPage = {
  kicker: string;
  h1: string;
  h1Aksent: string;
  h1Slutt: string;
  subheroLede: string;
  direkteKicker: string;
  direkteTittel: string;
  direkteLede: string;
  formTittel: string;
};

const KONTAKT_PAGE_FALLBACK: KontaktPage = {
  kicker: 'Kontakt oss',
  h1: 'La oss',
  h1Aksent: 'se på jobben',
  h1Slutt: '.',
  subheroLede: 'Send oss en henvendelse via skjemaet, eller ring direkte for en uforpliktende prat. Vi svarer normalt innen én virkedag.',
  direkteKicker: 'Direkte kontakt',
  direkteTittel: 'Slik når du oss.',
  direkteLede: 'Ta en telefon eller sms om det er hastesak — pipeproblemer fra feiervesenet, fuktskader på våtrom, frostskader eller lignende. Uforpliktende prisantydning gis ved innsending av bilder og informasjon om ønsket arbeid eller spørsmål.',
  formTittel: 'Send oss en henvendelse',
};

export async function getKontaktPage(): Promise<KontaktPage> {
  try {
    const data = await client.fetch<KontaktPage | null>(
      `*[_type == "kontaktPage" && _id == "kontaktPage"][0]{
        kicker, h1, h1Aksent, h1Slutt, subheroLede,
        direkteKicker, direkteTittel, direkteLede, formTittel
      }`
    );
    return data ?? KONTAKT_PAGE_FALLBACK;
  } catch (err) {
    return KONTAKT_PAGE_FALLBACK;
  }
}
