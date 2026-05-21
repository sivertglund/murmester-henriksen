export default {
  name: 'hero',
  title: 'Forside / hero',
  type: 'document',
  fields: [
    { name: 'welcome', title: 'Velkomst (over tittel)', type: 'string', description: 'Eks: "Mestermur · Etablert 2008 · Vear, Vestfold"' },
    { name: 'title', title: 'Stor tittel', type: 'string', description: 'Eks: "Alle trenger en murer!"' },
    { name: 'signature', title: 'Signatur-lenke (under tittel)', type: 'string', description: 'Eks: "Murmester Henriksen er her for å hjelpe deg!"' },
    { name: 'primaryCtaText', title: 'Primær-knapp tekst', type: 'string', initialValue: 'Få gratis befaring' },
    { name: 'secondaryCtaText', title: 'Sekundær-knapp tekst', type: 'string', initialValue: 'Se tjenestene' },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Hero' };
    },
  },
};
