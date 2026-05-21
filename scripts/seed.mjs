// One-shot migration of all current site content into Sanity.
// Run once: SANITY_TOKEN=... node scripts/seed.mjs
import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('SANITY_TOKEN env var missing');
  process.exit(1);
}

const client = createClient({
  projectId: '7f3j0z2i',
  dataset: 'production',
  apiVersion: '2024-05-01',
  token,
  useCdn: false,
});

// Helper: turn a list of strings into Portable Text "block" entries with style.
const block = (style, text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 10),
  style,
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  markDefs: [],
});

const singletons = [
  {
    _id: 'hero',
    _type: 'hero',
    welcome: 'Mestermur · Etablert 2008 · Vear, Vestfold',
    title: 'Alle trenger',
    titleEmphasis: 'en murer!',
    signature: 'Murmester Henriksen er her for å hjelpe deg!',
    primaryCtaText: 'Få gratis befaring',
    secondaryCtaText: 'Se tjenestene',
  },
  {
    _id: 'founder',
    _type: 'founder',
    kicker: 'Mestermur · Vear, Vestfold · siden 2008',
    tittel: 'Murmester',
    tittelAksent: 'Henriksen',
    tittelSlutt: '.',
    lede: 'Velkommen til Murmester Henriksen AS, din pålitelige partner for mur, puss, flis, naturstein, peis, pipe og mer. Med over 15 års bransjeerfaring leverer vi kvalitetstjenester til både privat- og næringskunder.',
    chips: [
      { _key: 'c1', tall: '15+', label: 'års erfaring', ikon: 'clock' },
      { _key: 'c2', tall: '2014', label: 'NM-sølv i muring', ikon: 'trophy' },
      { _key: 'c3', tall: '9', label: 'fagområder', ikon: 'grid' },
      { _key: 'c4', tall: 'Vestfold', label: 'hele fylket', ikon: 'pin' },
    ],
    lesMerTekst: 'Les mer om oss',
  },
  {
    _id: 'testimonials',
    _type: 'testimonials',
    kicker: 'Anbefalinger',
    tittel: 'Hva kundene',
    tittelAksent: 'faktisk sier',
    tittelSlutt: '.',
    sitater: [],
  },
  {
    _id: 'areas',
    _type: 'areas',
    tittel: 'Vi dekker hele',
    tittelAksent: 'Vestfold',
    tittelSlutt: '.',
    byer: ['Hvasser', 'Nøtterøy', 'Tønsberg', 'Larvik', 'Tjøme', 'Sandefjord', 'Horten', 'Skoppum', 'Sande', 'Stokke'],
  },
  {
    _id: 'cta',
    _type: 'cta',
    kicker: 'Klar for å starte?',
    tittel: 'La oss',
    tittelAksent: 'se på jobben',
    tittelSlutt: '.',
    primarBtnTekst: 'Be om befaring',
    ringBtnTekst: 'Ring 955 23 763',
  },
  {
    _id: 'kontakt',
    _type: 'kontakt',
    telefon: '955 23 763',
    telefonRaw: '+4795523763',
    epost: 'post@murmesterhenriksen.no',
    adresseLinje: 'Vear, 3173 Tønsberg · Vestfold',
    apningstider: { manTor: '07:00–15:30', fredag: '07:00–13:00', helg: 'Stengt' },
  },
  {
    _id: 'kontaktPage',
    _type: 'kontaktPage',
    kicker: 'Kontakt oss',
    h1: 'La oss',
    h1Aksent: 'se på jobben',
    h1Slutt: '.',
    subheroLede: 'Send oss en henvendelse via skjemaet, eller ring direkte for en uforpliktende prat. Vi svarer normalt innen én virkedag.',
    direkteKicker: 'Direkte kontakt',
    direkteTittel: 'Ring, mail, eller skriv.',
    direkteLede: 'Det går fortest å ringe — særlig om du har en akutt sak som frostskader eller pipeproblemer. For ordinære henvendelser fungerer skjemaet eller e-post like godt.',
    formTittel: 'Send oss en henvendelse',
  },
  {
    _id: 'omOss',
    _type: 'omOss',
    kicker: 'Om oss',
    h1: 'Mestermur Vincent',
    h1Aksent: 'Henriksen',
    h1Slutt: '.',
    subheroLede: 'En liten mestermurbedrift i Vear, Vestfold.',
    innhold: [
      block('h2', 'Et lite firma'),
      block('normal', 'Murmester Henriksen AS er etablert i Vear, Vestfold, og har vært i drift siden 2008.'),
      block('h2', 'Vincent Henriksen'),
      block('normal', 'Vincent er utdannet murer, har gått teknisk fagskole og har mestermurbrev. Han tok sølv i NM for unge murere i 2014, sitter i fylkets murerprøvenemnd og leder det lokale murmesterlauget.'),
      block('normal', 'Han underviser også i faget, vurderer i det og tar svenneprøver.'),
      block('h2', 'Hva vi tar oppdrag på'),
      block('normal', 'Vi arbeider over hele Vestfold. Vi gjør kalkrestaurering på verneverdige bygg, teglforblending på nybygg, og det meste imellom: puss, peis, pipe, flis, våtrom, skifer og naturstein.'),
      block('normal', 'Vi tar både private oppdrag og oppdrag for borettslag, bedrifter og offentlig sektor.'),
    ],
    nokkelfakta: [
      { _key: 'f1', label: 'Etablert', verdi: '2008 · Vear, Vestfold' },
      { _key: 'f2', label: 'Mester', verdi: 'Vincent Henriksen, mestermurbrev' },
      { _key: 'f3', label: 'Mesterskap', verdi: 'NM Sølv 2014' },
      { _key: 'f4', label: 'Verv', verdi: 'Leder, lokalt murmesterlaug · Prøvenemnd' },
      { _key: 'f5', label: 'Område', verdi: 'Hele Vestfold' },
      { _key: 'f6', label: 'Medlem', verdi: 'Norges Murmesterforening' },
    ],
  },
  {
    _id: 'footer',
    _type: 'footer',
    firmanavn: 'Murmester Henriksen AS',
    firmaadresse: 'Vear, Vestfold',
    tagline: 'Mestermur · Etablert 2008 · NM Sølv 2014',
    medlemTekst: 'Medlem · Norges Murmesterforening',
    facebookUrl: 'https://www.facebook.com/murmesterhenriksen',
    instagramUrl: 'https://www.instagram.com/murmesterhenriksen/',
  },
];

const tjenester = [
  { _id: 't-01', nummer: '01', tittel: 'Teglforblending og muring', slug: 'teglforblending', kortLede: 'Leverer alt innen teglforblending, leca, thermomur og mer.', rekkefolge: 1 },
  { _id: 't-02', nummer: '02', tittel: 'Puss', slug: 'puss', kortLede: 'Mørtelpuss, fasadepuss, fiberpuss, finpuss — det aller meste innen overflatebehandling til mur.', rekkefolge: 2 },
  { _id: 't-03', nummer: '03', tittel: 'Restaurering av murverk', slug: 'restaurering-av-murverk', kortLede: 'Restaurering av eldre murverk med hydraulisk kalk og mer.', rekkefolge: 3 },
  { _id: 't-04', nummer: '04', tittel: 'Rehabilitering av pipe', slug: 'rehabilitering-av-pipe', kortLede: 'Rehabilitering av eldre skorsteiner som er underkjent av feiervesenet. Leverer enten stål- eller keramiske rør, inkludert søknadsarbeid.', rekkefolge: 4 },
  { _id: 't-05', nummer: '05', tittel: 'Elementpipe & stålpipe', slug: 'elementpipe', kortLede: 'Oppføring av elementpipe og stålpipe fra A til Å, inkludert søknadsarbeid.', rekkefolge: 5 },
  { _id: 't-06', nummer: '06', tittel: 'Peis & vedovn', slug: 'peis-og-vedovn', kortLede: 'Montering av vedovner, peisinnsatser og brannforebyggende tiltak — for både næring og privatkunde.', rekkefolge: 6 },
  { _id: 't-07', nummer: '07', tittel: 'Flislegging & våtrom', slug: 'flislegging-og-vatrom', kortLede: 'Flislegging og membran til bad og andre våtromssoner.', rekkefolge: 7 },
  { _id: 't-08', nummer: '08', tittel: 'Sparkling og gulvavretting', slug: 'sparkling-og-gulvavretting', kortLede: 'Gulvavretting og sparkling for privatkunder.', rekkefolge: 8 },
  { _id: 't-09', nummer: '09', tittel: 'Skifer & Naturstein', slug: 'skifer-og-naturstein', kortLede: 'Legging av skifer eller naturstein i alle former og fasonger.', rekkefolge: 9 },
];

async function main() {
  console.log('Seeding singletons...');
  for (const doc of singletons) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._type}/${doc._id}`);
  }

  console.log('\nSeeding tjenester...');
  for (const t of tjenester) {
    const doc = {
      _id: t._id,
      _type: 'tjeneste',
      nummer: t.nummer,
      tittel: t.tittel,
      slug: { _type: 'slug', current: t.slug },
      kortLede: t.kortLede,
      rekkefolge: t.rekkefolge,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ tjeneste/${t._id} (${t.tittel})`);
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
