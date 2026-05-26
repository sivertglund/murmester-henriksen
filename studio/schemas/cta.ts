import { defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'Forside / CTA-strip (mørk seksjon)',
  type: 'document',
  fields: [
    { name: 'kicker', title: 'Kicker (liten tekst over)', type: 'string', initialValue: 'Klar for å starte?' },
    { name: 'tittel', title: 'Tittel (første del)', type: 'string', initialValue: 'La oss' },
    { name: 'tittelAksent', title: 'Tittel-aksent', type: 'string', initialValue: 'se på jobben' },
    { name: 'tittelSlutt', title: 'Tittel — etter aksent', type: 'string', initialValue: '.' },
    { name: 'primarBtnTekst', title: 'Primær-knapp tekst', type: 'string', initialValue: 'Be om prisantydning' },
    { name: 'ringBtnTekst', title: 'Telefon-knapp tekst', type: 'string', initialValue: 'Ring 955 23 763' },
  ],
  preview: {
    prepare() {
      return { title: 'Forside / CTA-strip' };
    },
  },
});
