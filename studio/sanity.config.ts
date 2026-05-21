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
            // ===== Forsiden =====
            S.listItem()
              .title('Forside — Hero (video-toppen)')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('Forside — Murmester-seksjon')
              .child(S.document().schemaType('founder').documentId('founder')),
            S.listItem()
              .title('Forside — Anbefalinger')
              .child(S.document().schemaType('testimonials').documentId('testimonials')),
            S.listItem()
              .title('Forside — Områder')
              .child(S.document().schemaType('areas').documentId('areas')),
            S.listItem()
              .title('Forside — CTA-strip (mørk)')
              .child(S.document().schemaType('cta').documentId('cta')),

            S.divider(),

            // ===== Andre sider =====
            S.listItem()
              .title('Om oss-siden')
              .child(S.document().schemaType('omOss').documentId('omOss')),
            S.listItem()
              .title('Kontakt-siden (tekster)')
              .child(S.document().schemaType('kontaktPage').documentId('kontaktPage')),

            S.divider(),

            // ===== Globalt =====
            S.listItem()
              .title('Kontaktinfo (telefon, e-post, åpningstider)')
              .child(S.document().schemaType('kontakt').documentId('kontakt')),
            S.listItem()
              .title('Footer (bunntekst)')
              .child(S.document().schemaType('footer').documentId('footer')),

            S.divider(),

            // ===== Lister =====
            S.documentTypeListItem('tjeneste').title('Tjenester (9 stk)'),
            S.documentTypeListItem('prosjekt').title('Prosjekter'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
