import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import english from 'i18n-config/lang/en.json';
import polish from 'i18n-config/lang/pl.json';

const app = createApp(App);
i18next.init({
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

app.use(I18NextVue, { i18next });
app.mount('#app');
