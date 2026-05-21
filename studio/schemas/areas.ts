import { defineType } from 'sanity';

export default defineType({
  name: 'areas',
  title: 'Forside / Områder',
  type: 'document',
  fields: [
    { name: 'tittel', title: 'Tittel (første del)', type: 'string', initialValue: 'Vi dekker hele' },
    { name: 'tittelAksent', title: 'Tittel-aksent (i håndskrift-farge)', type: 'string', initialValue: 'Vestfold' },
    { name: 'tittelSlutt', title: 'Tittel — etter aksent (valgfri)', type: 'string', initialValue: '.' },
    {
      name: 'byer',
      title: 'Byer',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Hvasser', 'Nøtterøy', 'Tønsberg', 'Larvik', 'Tjøme', 'Sandefjord', 'Horten', 'Skoppum', 'Sande', 'Stokke'],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Forside / Områder' };
    },
  },
});
