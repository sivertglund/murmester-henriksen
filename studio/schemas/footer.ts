import { defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer (bunntekst)',
  type: 'document',
  fields: [
    { name: 'firmanavn', title: 'Firmanavn (fet)', type: 'string', initialValue: 'Murmester Henriksen AS' },
    { name: 'firmaadresse', title: 'Adresse (under navn)', type: 'string', initialValue: 'Vear, Vestfold' },
    { name: 'tagline', title: 'Tagline (helt nederst i brand-blokk)', type: 'string', initialValue: 'Mestermur · Etablert 2008 · NM Sølv 2014' },
    { name: 'medlemTekst', title: 'Medlems-tekst (i nederste linje)', type: 'string', initialValue: 'Medlem · Norges Murmesterforening' },
    { name: 'facebookUrl', title: 'Facebook URL', type: 'url', initialValue: 'https://www.facebook.com/murmesterhenriksen' },
    { name: 'instagramUrl', title: 'Instagram URL', type: 'url', initialValue: 'https://www.instagram.com/murmesterhenriksen/' },
  ],
  preview: {
    prepare() {
      return { title: 'Footer' };
    },
  },
});
