import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import english from 'i18n-config/lang/en.json';
import polish from 'i18n-config/lang/pl.json';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: english,
      },
      pl: {
        translation: polish,
      },
    },
  });

export default i18n;
