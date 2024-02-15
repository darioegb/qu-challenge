import { createI18n } from 'vue-i18n';

import en from 'src/assets/i18n/en.json';
import es from 'src/assets/i18n/es.json';

const messages = { en, es };

// 2. Create i18n instance with options
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en', // set locale
  fallbackLocale: ['en'], // set fallback locale
  messages, // set locale messages,
  missingWarn: false, // fallback warn not found key...
  fallbackWarn: false, // fallback warn  fall back to...
});

export default i18n;
