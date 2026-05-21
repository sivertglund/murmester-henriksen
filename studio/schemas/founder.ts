import { defineType } from 'sanity';

export default defineType({
  name: 'founder',
  title: 'Forside / Murmester-seksjon',
  type: 'document',
  fields: [
    { name: 'kicker', title: 'Kicker (liten tekst over)', type: 'string', initialValue: 'Mestermur · Vear, Vestfold · siden 2008' },
    { name: 'portrett', title: 'Portrettbilde (Vincent)', type: 'image', options: { hotspot: true }, description: 'Last opp et nytt bilde for å endre portrettet på forsiden.' },
    { name: 'tittel', title: 'Tittel (første del)', type: 'string', initialValue: 'Murmester' },
    { name: 'tittelAksent', title: 'Tittel-aksent (i håndskrift-farge)', type: 'string', initialValue: 'Henriksen' },
    { name: 'tittelSlutt', title: 'Tittel — etter aksent (valgfri)', type: 'string', initialValue: '.' },
    { name: 'lede', title: 'Lede-tekst (under tittel)', type: 'text', rows: 4 },
    {
      name: 'chips',
      title: 'Chips (de fire boksene)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chip',
          title: 'Chip',
          fields: [
            { name: 'tall', title: 'Tall / verdi', type: 'string', description: 'Eks "15+", "2014", "9", "Vestfold"' },
            { name: 'label', title: 'Label (under tallet)', type: 'string', description: 'Eks "års erfaring", "NM-sølv i muring"' },
            {
              name: 'ikon',
              title: 'Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Klokke', value: 'clock' },
                  { title: 'Pokal', value: 'trophy' },
                  { title: 'Grid (4 ruter)', value: 'grid' },
                  { title: 'Stedmarkør', value: 'pin' },
                ],
              },
              initialValue: 'clock',
            },
          ],
          preview: {
            select: { title: 'tall', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Maks 4 chips for best layout'),
    },
    { name: 'lesMerTekst', title: '"Les mer"-knapp tekst', type: 'string', initialValue: 'Les mer om oss' },
  ],
  preview: {
    prepare() {
      return { title: 'Forside / Murmester-seksjon' };
    },
  },
});
