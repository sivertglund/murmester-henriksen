import { defineType } from 'sanity';

export default defineType({
  name: 'omOss',
  title: 'Om oss-siden',
  type: 'document',
  fields: [
    { name: 'kicker', title: 'Subhero kicker', type: 'string', initialValue: 'Om oss' },
    { name: 'subheroBilde', title: 'Subhero bakgrunnsbilde (portrett)', type: 'image', options: { hotspot: true } },
    { name: 'portrettKortBilde', title: 'Portrett-kort bilde (i artikkelen)', type: 'image', options: { hotspot: true } },
    { name: 'portrettKortNavn', title: 'Portrett-kort navn', type: 'string', initialValue: 'Vincent Henriksen' },
    { name: 'portrettKortRolle', title: 'Portrett-kort rolle', type: 'string', initialValue: 'Mestermur · Daglig leder' },
    { name: 'h1', title: 'H1 (første del)', type: 'string', initialValue: 'Mestermur Vincent' },
    { name: 'h1Aksent', title: 'H1-aksent', type: 'string', initialValue: 'Henriksen' },
    { name: 'h1Slutt', title: 'H1 — etter aksent', type: 'string', initialValue: '.' },
    { name: 'subheroLede', title: 'Subhero lede-tekst', type: 'text', rows: 2, initialValue: 'En liten mestermurbedrift i Vear, Vestfold.' },
    {
      name: 'innhold',
      title: 'Hovedinnhold (artikkel)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rik tekst med overskrifter, avsnitt, fete ord, lister.',
    },
    {
      name: 'nokkelfakta',
      title: 'Nøkkelfakta (sidekolonne)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fakta',
          fields: [
            { name: 'label', title: 'Label (over verdi)', type: 'string' },
            { name: 'verdi', title: 'Verdi', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'verdi' } },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Om oss-siden' };
    },
  },
});
