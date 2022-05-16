import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en/translation.json';
import translationVi from './locales/vi/translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
  vi: {
    translation: translationVi,
  },
};

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'vi',
  lng: 'vi',
  load: 'all',
  ns: ['translation'],
  defaultNS: 'translation',
  resources: resources,
  react: { wait: true },
  interpolation: { escapeValue: false },
});

export default i18n;
