export default {
  name: 'kontakt',
  title: 'Kontaktinfo',
  type: 'document',
  fields: [
    { name: 'telefon', title: 'Telefon (visningsformat)', type: 'string', initialValue: '955 23 763' },
    { name: 'telefonRaw', title: 'Telefon (uten mellomrom, for tel:-lenke)', type: 'string', initialValue: '+4795523763' },
    { name: 'epost', title: 'E-post', type: 'string', initialValue: 'post@murmesterhenriksen.no' },
    { name: 'adresseLinje', title: 'Adresse (én linje)', type: 'string', initialValue: 'Vear, 3173 Tønsberg · Vestfold' },
    {
      name: 'apningstider',
      title: 'Åpningstider (4 linjer)',
      type: 'object',
      fields: [
        { name: 'manTor', title: 'Man–Tor', type: 'string', initialValue: '07:00–15:30' },
        { name: 'fredag', title: 'Fredag', type: 'string', initialValue: '07:00–13:00' },
        { name: 'helg', title: 'Lør & søn', type: 'string', initialValue: 'Stengt' },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Kontaktinfo' };
    },
  },
};
