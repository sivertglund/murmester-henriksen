// 5 hovedkategorier, hver med underkategorier — fra Vincents tabell.
// Når vi senere koples til Sanity, leses dette fra CMS. For nå er det hardkodet.

export type Underkategori = {
  navn: string;
  prisFra?: string; // f.eks. "1 950 kr/m²" — fylles inn senere
};

export type Kategori = {
  nummer: string;
  slug: string;
  tittel: string;
  kortLede: string;
  underkategorier: Underkategori[];
};

export const KATEGORIER: Kategori[] = [
  {
    nummer: '01',
    slug: 'muring',
    tittel: 'Muring',
    kortLede: 'Teglforblending, Leca, Thermomur, kistemur, tørrmur, skifer og natursteinarbeid — fra fundament til ferdig fasade.',
    underkategorier: [
      { navn: 'Teglforblending' },
      { navn: 'Leca-muring' },
      { navn: 'Thermomur' },
      { navn: 'Kistemur' },
      { navn: 'Tørrmur' },
      { navn: 'Systemblokk' },
      { navn: 'Bruddskifer' },
      { navn: 'Skiferlegging av plater, trapper og vegg' },
      { navn: 'Skiferpanel' },
      { navn: 'Restaurering av antikvarisk murverk' },
    ],
  },
  {
    nummer: '02',
    slug: 'puss',
    tittel: 'Puss',
    kortLede: 'Mørtelpuss, fasadepuss, fiberpuss, finpuss, samt tradisjonelle puss-teknikker til moderne og verneverdige bygg.',
    underkategorier: [
      { navn: 'Mørtelpuss' },
      { navn: 'Hydraulisk kalkpuss til restaurering av antikvarisk murverk' },
      { navn: 'Fiberpuss' },
      { navn: 'Fasadepuss' },
      { navn: 'Loddpuss' },
      { navn: 'Brettskur' },
      { navn: 'Munkepuss' },
      { navn: 'Stenkpuss' },
      { navn: 'Sekkeskuring' },
      { navn: 'Kostepuss' },
    ],
  },
  {
    nummer: '03',
    slug: 'ildsted-og-skorstein',
    tittel: 'Ildsted og skorstein',
    kortLede: 'Montering av vedovn og peisinnsats, gruepeis, samt oppføring og rehabilitering av piper — element, stål eller teglmur.',
    underkategorier: [
      { navn: 'Montering av vedovn' },
      { navn: 'Montering av peisinnsats og brannplater' },
      { navn: 'Gruepeis' },
      { navn: 'Oppføring av elementpipe' },
      { navn: 'Oppføring av stålpipe' },
      { navn: 'Oppføring av teglpipe' },
      { navn: 'Rehabilitering av piper med stålrør' },
      { navn: 'Service og vedlikehold' },
    ],
  },
  {
    nummer: '04',
    slug: 'flis-vatrom-betong',
    tittel: 'Flis, våtrom og betong',
    kortLede: 'Sertifisert våtromsarbeid — baderomsstøp, membran, flislegging, fallavretting og mindre betongarbeider.',
    underkategorier: [
      { navn: 'Baderomsstøp' },
      { navn: 'Smøremembran' },
      { navn: 'Flislegging' },
      { navn: 'Flytavretting av gulv' },
      { navn: 'Mindre betongarbeider' },
      { navn: 'Fuktsikring' },
      { navn: 'Gulvstøp' },
      { navn: 'Falloppbygging' },
    ],
  },
  {
    nummer: '05',
    slug: 'restaurering',
    tittel: 'Restaurering',
    kortLede: 'Hydraulisk kalk (NHL), antikvariske og riksantikvariske arbeider, tradisjonell rapping og restaurering av eldre fasader og naturstein.',
    underkategorier: [
      { navn: 'Hydraulisk kalk (NHL)' },
      { navn: 'Antikvarisk murverk' },
      { navn: 'Riksantikvariske arbeider' },
      { navn: 'Tradisjonell rapping' },
      { navn: 'Restaurering av naturstein' },
      { navn: 'Restaurering av teglfasader' },
      { navn: 'Kulturhistoriske bygg' },
    ],
  },
];

export function getKategori(slug: string): Kategori | undefined {
  return KATEGORIER.find((k) => k.slug === slug);
}
