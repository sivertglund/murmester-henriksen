// 5 hovedkategorier, hver med underkategorier — fra Vincents tabell.
// Beskrivelse + pris er valgfritt og legges inn etter hvert.

export type Underkategori = {
  navn: string;
  beskrivelse?: string;  // Kort forklaring (1 setning) — bra for folk som ikke kjenner muring
  infoTekst?: string;    // Lang-form: hva er fagarbeidet, når brukes det, hva får kunden? Vises i ekspander.
  prisFra?: string;      // f.eks. "1 950"
  prisTil?: string;      // f.eks. "2 400" — valgfri øvre del av spennet
  prisEnhet?: string;    // f.eks. "kr/m²", "kr/stk", "kr/dag"
  prisNote?: string;     // f.eks. "Avhenger av omfang" eller "Eks. mva"
};

export type GalleriBilde = {
  src: string;
  alt: string;
};

export type Kategori = {
  nummer: string;
  slug: string;
  tittel: string;
  kortLede: string;       // 1 setning, vises på hub-kort og forsiden
  introTekst: string;     // 2-3 setninger, vises som intro på kategori-siden
  heroBilde: string;      // URL eller path til hero på kategori-siden
  underkategorier: Underkategori[];
  galleri?: GalleriBilde[]; // Bilder fra Vincent — vises som strip på detalj-siden
};

export const KATEGORIER: Kategori[] = [
  {
    nummer: '01',
    slug: 'muring',
    tittel: 'Muring',
    kortLede: 'Tegl, Leca, Thermomur, naturstein — fra fundament til ferdig fasade.',
    introTekst:
      'Murverket er bygningens ryggrad. Vi murer i tegl, betongblokk og naturstein — alt fra bærevegger og kjellermurer til presisjonsforblending på fasade. Hvilket system vi velger styres av bygget, eksponeringen og uttrykket du vil ha.',
    heroBilde: '/assets/projects/project-02.jpg',
    underkategorier: [
      { navn: 'Teglforblending', beskrivelse: 'Tradisjonell muring med tegl utenpå bærekonstruksjon. Gir en fasade som tåler vær og tid.' },
      { navn: 'Leca-muring', beskrivelse: 'Lette blokker for bærevegger og kjellermurer. God isolasjon, raskt å mure.' },
      { navn: 'Thermomur', beskrivelse: 'Isolerende blokk for nybygg med strenge varmekrav.' },
      { navn: 'Kistemur', beskrivelse: 'Dobbeltvegg med hulrom — klassisk konstruksjon brukt på eldre bygg.' },
      { navn: 'Tørrmur', beskrivelse: 'Naturstein lagt uten mørtel. Håndverksintensivt og varig.' },
      { navn: 'Systemblokk', beskrivelse: 'Prefabrikkerte betongblokker som mures raskt og presist.' },
      { navn: 'Bruddskifer', beskrivelse: 'Skifer i naturlige bruddflater — rustikt uttrykk på fasade eller mur.' },
      { navn: 'Skiferlegging av plater, trapper og vegg', beskrivelse: 'Plater og blokker av skifer på trapper, inngangspartier og vegger.' },
      { navn: 'Skiferpanel', beskrivelse: 'Moderne fasadeløsning i skifer, lett og slank.' },
      { navn: 'Restaurering av antikvarisk murverk', beskrivelse: 'Forsiktig istandsetting av eldre murverk med originalmetoder.' },
    ],
    galleri: [
      { src: '/assets/galleri/muring/tegl-1.jpg', alt: 'Tegl' },
      { src: '/assets/galleri/muring/tegl-2.jpg', alt: 'Tegl' },
      { src: '/assets/galleri/muring/tegl-3.jpg', alt: 'Tegl' },
      { src: '/assets/galleri/muring/tegl-4.jpg', alt: 'Tegl' },
      { src: '/assets/galleri/muring/naturstein-1.jpg', alt: 'StoneWall' },
      { src: '/assets/galleri/muring/naturstein-2.jpg', alt: 'StoneWall' },
      { src: '/assets/galleri/muring/skifer-oppdal.jpg', alt: 'Skifer Oppdal' },
    ],
  },
  {
    nummer: '02',
    slug: 'puss',
    tittel: 'Puss',
    kortLede: 'Mørtelpuss, fasadepuss, finpuss og tradisjonelle teknikker — moderne og verneverdig.',
    introTekst:
      'Puss er både beskyttelse og uttrykk. Vi blander mørtelen selv og velger system etter underlag og bygg. Vi pusser fasader på nybygg, restaurerer gamle puss-flater og utfører tradisjonelle teknikker som ikke alle behersker.',
    heroBilde: '/assets/projects/project-01.jpg',
    underkategorier: [
      { navn: 'Mørtelpuss', beskrivelse: 'Klassisk pussing med sement- eller kalkmørtel — for fasade eller innvendig.' },
      { navn: 'Hydraulisk kalkpuss til restaurering', beskrivelse: 'Pust-evne kalkmørtel som bevarer antikvarisk murverk uten å skade.' },
      { navn: 'Fiberpuss', beskrivelse: 'Fiberarmert puss som motvirker sprekkdannelse på utsatte flater.' },
      { navn: 'Fasadepuss', beskrivelse: 'Pussede fasader på enebolig, hytte og næringsbygg.' },
      { navn: 'Loddpuss', beskrivelse: 'Trekt med lodd og rettholt — millimeterpresis flate.' },
      { navn: 'Brettskur', beskrivelse: 'Pussflate avglattet med brett — gir en jevn, halvgrov tekstur.' },
      { navn: 'Munkepuss', beskrivelse: 'Tradisjonell norsk pussteknikk med karakteristisk overflate.' },
      { navn: 'Stenkpuss', beskrivelse: 'Stenket på med kost eller maskin — rustikt, ujevnt uttrykk.' },
      { navn: 'Sekkeskuring', beskrivelse: 'Tradisjonell finish som gir tegl en delvis dekket, varm overflate.' },
      { navn: 'Kostepuss', beskrivelse: 'Pussflate med kost-tekstur — vanlig på kjeller og fasade.' },
    ],
    galleri: [
      { src: '/assets/galleri/puss/mortelpuss.jpg', alt: 'Mørtelpuss' },
      { src: '/assets/galleri/puss/fiberpuss.jpg', alt: 'Fiberpuss' },
      { src: '/assets/galleri/puss/pipepuss.jpg', alt: 'Pipepuss' },
    ],
  },
  {
    nummer: '03',
    slug: 'ildsted-og-skorstein',
    tittel: 'Ildsted og skorstein',
    kortLede: 'Vedovn, peisinnsats, gruepeis og piper — montering, oppføring og rehabilitering.',
    introTekst:
      'Et ildsted skal være trygt, godkjent og se bra ut. Vi monterer alt fra moderne vedovner til klassiske gruepeiser, fører opp piper i element, stål eller teglmur, og rehabiliterer eldre skorsteiner som er underkjent av feiervesenet.',
    heroBilde: '/assets/projects/project-04.jpg',
    underkategorier: [
      { navn: 'Montering av vedovn', beskrivelse: 'Komplett montering med brannplate, røykrør og tilkobling.' },
      { navn: 'Montering av peisinnsats og brannplater', beskrivelse: 'Innsats i ny eller eksisterende peis, med brannsikring.' },
      { navn: 'Gruepeis', beskrivelse: 'Klassisk åpen peis med grue — varmekilde og rom-element.' },
      { navn: 'Oppføring av elementpipe', beskrivelse: 'Prefabrikkerte modulpiper — rask og forskriftsmessig montering.' },
      { navn: 'Oppføring av stålpipe', beskrivelse: 'Lett pipeløsning, ofte brukt der plass eller statikk er en utfordring.' },
      { navn: 'Oppføring av teglpipe', beskrivelse: 'Tradisjonell murt pipe med tegl — solid og dekorativ.' },
      { navn: 'Rehabilitering av piper med stålrør', beskrivelse: 'Foring av eldre røykløp med stål — utfører hele jobben inkl. søknad.' },
      { navn: 'Service og vedlikehold', beskrivelse: 'Inspeksjon, reparasjon og småfix på ildsted og pipe.' },
    ],
    galleri: [
      { src: '/assets/galleri/ildsted/peis-1.jpg', alt: 'Peis' },
      { src: '/assets/galleri/ildsted/peis-2.jpg', alt: 'Peis' },
      { src: '/assets/galleri/ildsted/peis-3.jpg', alt: 'Peis' },
      { src: '/assets/galleri/ildsted/vedovn.jpg', alt: 'Vedovn' },
      { src: '/assets/galleri/ildsted/pipe-rehab.jpg', alt: 'Rehabilitering pipe' },
      { src: '/assets/galleri/ildsted/stenpeis.jpg', alt: 'StoneWall og peis' },
    ],
  },
  {
    nummer: '04',
    slug: 'flis-vatrom-betong',
    tittel: 'Flis, våtrom og betong',
    kortLede: 'Sertifisert våtromsarbeid — fra støp og membran til ferdig flisbelagt bad.',
    introTekst:
      'Et våtrom er like solid som forarbeidet. Vi støper opp riktig fall, legger godkjent membran og fliser eller naturstein på toppen. Vi gjør også mindre betongarbeider, gulvavretting og fuktsikring.',
    heroBilde: '/assets/projects/project-07.jpg',
    underkategorier: [
      { navn: 'Baderomsstøp', beskrivelse: 'Støp av gulv og terskler med riktig fall til sluk.' },
      { navn: 'Smøremembran', beskrivelse: 'Påført membran som tetter gulv og vegger før flislegging.' },
      { navn: 'Flislegging', beskrivelse: 'Keramiske fliser, naturstein, mosaikk og storformat — gulv og vegg.' },
      { navn: 'Flytavretting av gulv', beskrivelse: 'Selvutjevnende sparkel for plant, presist underlag.' },
      { navn: 'Mindre betongarbeider', beskrivelse: 'Reparasjon og småstøp i betong — der det trengs.' },
      { navn: 'Fuktsikring', beskrivelse: 'Tiltak mot fukt og vanninntrengning i utsatte konstruksjoner.' },
      { navn: 'Gulvstøp', beskrivelse: 'Komplett støp av gulv på terreng eller dekke.' },
      { navn: 'Falloppbygging', beskrivelse: 'Bygging av fall til sluk i våtrom, balkonger og uteareal.' },
    ],
    galleri: [
      { src: '/assets/galleri/flis-vatrom/flis.jpg', alt: 'Flis' },
      { src: '/assets/galleri/flis-vatrom/forskalling-stop.jpg', alt: 'Forskalling og støp' },
    ],
  },
  {
    nummer: '05',
    slug: 'restaurering',
    tittel: 'Restaurering',
    kortLede: 'Hydraulisk kalk, antikvarisk og riksantikvarisk arbeid — varsomt og fagriktig.',
    introTekst:
      'Eldre murbygg er bygget for å puste. Med moderne sementmørtel skader man ofte mer enn man reparerer. Vi arbeider med hydraulisk kalk og tradisjonelle metoder, dokumenterer det vi gjør, og samarbeider tett med fylkets antikvarer der det kreves.',
    heroBilde: '/assets/projects/project-03.jpg',
    underkategorier: [
      { navn: 'Hydraulisk kalk (NHL)', beskrivelse: 'Naturlig hydraulisk kalkmørtel — pust-evne, fleksibel, riktig for eldre bygg.' },
      { navn: 'Antikvarisk murverk', beskrivelse: 'Murverk i tråd med antikvariske retningslinjer — eldre tegl, kalkmørtel.' },
      { navn: 'Riksantikvariske arbeider', beskrivelse: 'Arbeid på bygg med riksantikvarisk status — dokumentert og kontrollert.' },
      { navn: 'Tradisjonell rapping', beskrivelse: 'Eldre pusslinjer og rapping — bevart med originalmetoder.' },
      { navn: 'Restaurering av naturstein', beskrivelse: 'Reparasjon og utskifting av enkeltsteiner og hele partier.' },
      { navn: 'Restaurering av teglfasader', beskrivelse: 'Refuging, frostskader, utskifting av tegl — riktig mørtel, riktig farge.' },
      { navn: 'Kulturhistoriske bygg', beskrivelse: 'Arbeid på bygg med kulturhistorisk verdi — varsomt og dokumentert.' },
    ],
    galleri: [
      { src: '/assets/galleri/restaurering/antikvarisk-1.jpg', alt: 'Antikvarisk arbeid' },
      { src: '/assets/galleri/restaurering/antikvarisk-2.jpg', alt: 'Antikvarisk arbeid' },
      { src: '/assets/galleri/restaurering/restaurering-tegl-pipe.jpg', alt: 'Restaurering tegl og pipe' },
    ],
  },
];

export function getKategori(slug: string): Kategori | undefined {
  return KATEGORIER.find((k) => k.slug === slug);
}
