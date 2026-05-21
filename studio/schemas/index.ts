import hero from './hero';
import founder from './founder';
import testimonials from './testimonials';
import areas from './areas';
import cta from './cta';
import kontakt from './kontakt';
import kontaktPage from './kontaktPage';
import omOss from './omOss';
import footer from './footer';
import tjeneste from './tjeneste';
import prosjekt from './prosjekt';

export const schemaTypes = [
  // Singletons (one document each)
  hero,
  founder,
  testimonials,
  areas,
  cta,
  kontakt,
  kontaktPage,
  omOss,
  footer,
  // Document types (multiple instances)
  tjeneste,
  prosjekt,
];
