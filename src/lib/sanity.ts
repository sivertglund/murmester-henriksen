import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '7f3j0z2i',
  dataset: 'production',
  apiVersion: '2024-05-01',
  useCdn: true, // Cached CDN reads — perfect for static build
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Kontaktinfo — én singleton-document med id 'kontakt'
export type Kontakt = {
  telefon: string;
  telefonRaw: string;
  epost: string;
  adresseLinje: string;
  apningstider?: {
    manTor?: string;
    fredag?: string;
    helg?: string;
  };
};

// Fallback brukes hvis Sanity er tomt eller utilgjengelig under build.
// Det betyr at siden alltid har data — selv før Vincent fyller inn Studio.
const KONTAKT_FALLBACK: Kontakt = {
  telefon: '955 23 763',
  telefonRaw: '+4795523763',
  epost: 'post@murmesterhenriksen.no',
  adresseLinje: 'Vear, 3173 Tønsberg · Vestfold',
  apningstider: {
    manTor: '07:00–15:30',
    fredag: '07:00–13:00',
    helg: 'Stengt',
  },
};

export async function getKontakt(): Promise<Kontakt> {
  try {
    const data = await client.fetch<Kontakt | null>(
      `*[_type == "kontakt" && _id == "kontakt"][0]{
        telefon, telefonRaw, epost, adresseLinje, apningstider
      }`
    );
    return data ?? KONTAKT_FALLBACK;
  } catch (err) {
    console.warn('[sanity] kontakt fetch failed, using fallback', err);
    return KONTAKT_FALLBACK;
  }
}
