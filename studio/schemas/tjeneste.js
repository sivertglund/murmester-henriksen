export default {
  name: 'tjeneste',
  title: 'Tjeneste',
  type: 'document',
  fields: [
    { name: 'nummer', title: 'Nummer (01–09)', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'tittel', title: 'Tittel', type: 'string', validation: (Rule) => Rule.required() },
    {
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'tittel', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    { name: 'kortLede', title: 'Kort lede (vises på forside og oversikt)', type: 'text', rows: 2 },
    { name: 'subheroBilde', title: 'Banner-bilde', type: 'image', options: { hotspot: true } },
    { name: 'artikkelH2', title: 'Artikkel — H2-tittel', type: 'string' },
    {
      name: 'artikkelInnhold',
      title: 'Artikkel — innhold',
      type: 'array',
      of: [{ type: 'block' }],
    },
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
    select: { title: 'tittel', nummer: 'nummer', subtitle: 'kortLede' },
    prepare({ title, nummer, subtitle }) {
      return { title: `${nummer || '?'} — ${title || 'Tjeneste'}`, subtitle };
    },
  },
};
