import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Murmester Henriksen',

  projectId: '7f3j0z2i',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .title('Forside / hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('Kontaktinfo')
              .child(S.document().schemaType('kontakt').documentId('kontakt')),
            S.divider(),
            S.documentTypeListItem('tjeneste').title('Tjenester'),
            S.documentTypeListItem('prosjekt').title('Prosjekter'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
