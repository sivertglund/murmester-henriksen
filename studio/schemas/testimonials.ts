import { defineType } from 'sanity';

export default defineType({
  name: 'testimonials',
  title: 'Forside / Anbefalinger',
  type: 'document',
  fields: [
    { name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'Anbefalinger' },
    { name: 'tittel', title: 'Tittel (første del)', type: 'string', initialValue: 'Hva kundene' },
    { name: 'tittelAksent', title: 'Tittel-aksent', type: 'string', initialValue: 'faktisk sier' },
    { name: 'tittelSlutt', title: 'Tittel — etter aksent', type: 'string', initialValue: '.' },
    {
      name: 'sitater',
      title: 'Sitater',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sitat',
          fields: [
            { name: 'tekst', title: 'Sitat', type: 'text', rows: 4 },
            { name: 'navn', title: 'Navn', type: 'string' },
            { name: 'meta', title: 'Sted og fagområde (eks. "Tønsberg · Tegl")', type: 'string' },
          ],
          preview: {
            select: { title: 'navn', subtitle: 'tekst' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Forside / Anbefalinger' };
    },
  },
});
