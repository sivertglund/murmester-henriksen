import { defineType } from 'sanity';

export default defineType({
  name: 'kontaktPage',
  title: 'Kontakt-siden (tekster)',
  type: 'document',
  fields: [
    { name: 'kicker', title: 'Subhero kicker', type: 'string', initialValue: 'Kontakt oss' },
    { name: 'h1', title: 'H1 (første del)', type: 'string', initialValue: 'La oss' },
    { name: 'h1Aksent', title: 'H1-aksent', type: 'string', initialValue: 'se på jobben' },
    { name: 'h1Slutt', title: 'H1 — etter aksent', type: 'string', initialValue: '.' },
    { name: 'subheroLede', title: 'Subhero lede-tekst', type: 'text', rows: 3, initialValue: 'Send oss en henvendelse via skjemaet, eller ring direkte for en uforpliktende prat. Vi svarer normalt innen én virkedag.' },
    { name: 'direkteKicker', title: 'Kicker over "Direkte kontakt"-blokk', type: 'string', initialValue: 'Direkte kontakt' },
    { name: 'direkteTittel', title: 'Direkte kontakt — tittel', type: 'string', initialValue: 'Slik når du oss.' },
    { name: 'direkteLede', title: 'Direkte kontakt — lede-tekst', type: 'text', rows: 3, initialValue: 'Det går fortest å ringe — særlig om du har en akutt sak som frostskader eller pipeproblemer. For ordinære henvendelser fungerer skjemaet eller e-post like godt.' },
    { name: 'formTittel', title: 'Form — tittel', type: 'string', initialValue: 'Send oss en henvendelse' },
  ],
  preview: {
    prepare() {
      return { title: 'Kontakt-siden' };
    },
  },
});
