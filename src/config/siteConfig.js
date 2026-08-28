// =============================================================
// NASIR CAFÉ — CENTRAL BUSINESS CONFIGURATION
// Change café name, contact details, hours, socials, delivery
// fee, currency, logo and hero image here. Nothing else in the
// codebase needs to be touched for these business changes.
// =============================================================

const siteConfig = {
  name: 'NASIR CAFÉ',
  shortName: 'Nasir Café',
  tagline: 'Good Food. Great Coffee. Better Moments.',
  description:
    'Freshly prepared food, handcrafted coffee and delicious moments — all served with the warmth of NASIR CAFÉ.',

  logoText: 'NASIR',
  logoAccent: 'CAFÉ',

  currency: 'AED',
  deliveryFee: 10,
  freeDeliveryThreshold: 150,

  contact: {
    address: 'Sheikh Zayed Road, Dubai, UAE',
    city: 'Dubai, UAE',
    phone: '+971 54 597 7360',
    phoneDisplay: '+971 XX XXX XXXX',
    whatsapp: '971545977360',
    email: 'nasir210909@gmail.com',
  },

  hours: {
    days: 'Monday – Sunday',
    time: '08:00 AM – 12:00 AM',
  },

  social: {
    instagram: 'https://instagram.com/nasircafe',
    facebook: 'https://facebook.com/nasircafe',
    tiktok: 'https://tiktok.com/@nasircafe',
    whatsapp: 'https://wa.me/971545977360',
  },

  images: {
    hero: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80',
    about:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    offer1:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    offer2:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    offer3:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  },

  mapEmbedUrl:
    'https://www.google.com/maps?q=Sheikh+Zayed+Road+Dubai&output=embed',
}

export default siteConfig
