import { defineType } from 'sanity';

export default defineType({
  name: 'prosjekt',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    { name: 'tittel', title: 'Tittel (kort, vises som alt-tekst)', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'bilde', title: 'Bilde', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'sted', title: 'Sted', type: 'string' },
    { name: 'aar', title: 'År', type: 'string' },
    {
      name: 'rekkefolge',
      title: 'Sortering (lavest tall først)',
      type: 'number',
      initialValue: 99,
    },
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'rekkefolgeAsc',
      by: [{ field: 'rekkefolge', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'tittel', subtitle: 'sted', media: 'bilde' },
  },
});
