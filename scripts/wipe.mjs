// Tømmer Sanity for alle innholds-dokumenter (singletons + tjenester + prosjekter).
// Etter dette bruker Astro fallback-tekster fra src/lib/sanity.ts.
// Kjør: SANITY_TOKEN=... node scripts/wipe.mjs
import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('SANITY_TOKEN env var missing');
  process.exit(1);
}

const client = createClient({
  projectId: '7f3j0z2i',
  dataset: 'production',
  apiVersion: '2024-05-01',
  token,
  useCdn: false,
});

const typesToWipe = [
  'hero', 'founder', 'testimonials', 'areas', 'cta',
  'kontakt', 'kontaktPage', 'omOss', 'footer',
  'tjeneste', 'prosjekt',
];

async function main() {
  for (const type of typesToWipe) {
    const ids = await client.fetch(`*[_type == $type]._id`, { type });
    if (ids.length === 0) {
      console.log(`  - ${type}: ingen dokumenter`);
      continue;
    }
    for (const id of ids) {
      await client.delete(id);
    }
    console.log(`  ✓ ${type}: slettet ${ids.length} dokument(er)`);
  }
  console.log('\nFerdig. Sanity er tom — siden bruker nå fallback-tekster fra koden.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
