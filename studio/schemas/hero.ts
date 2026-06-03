import { defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Forside / hero',
  type: 'document',
  fields: [
    { name: 'welcome', title: 'Velkomst (over tittel)', type: 'string', description: 'Eks: "Mestermur · Etablert 2008 · Vear, Vestfold"' },
    { name: 'title', title: 'Stor tittel (første del)', type: 'string', description: 'Eks: "Alle trenger"' },
    { name: 'titleEmphasis', title: 'Tittel-aksent (vises i håndskriftfont)', type: 'string', description: 'Eks: "en murer!" — denne delen tegnes ut med pen-effekt' },
    { name: 'signature', title: 'Signatur-lenke (under tittel)', type: 'string', description: 'Eks: "Murmester Henriksen er her for å hjelpe deg!"' },
    { name: 'primaryCtaText', title: 'Primær-knapp tekst', type: 'string', initialValue: 'Kontakt oss' },
    { name: 'secondaryCtaText', title: 'Sekundær-knapp tekst', type: 'string', initialValue: 'Se tjenestene' },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Hero' };
    },
  },
});
