import { createApp } from 'vue'
import App from './App.vue'

// ROUTING
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routing/routes.js'

// STATE MANAGEMENT
import { createPinia } from 'pinia'

// TRANSLATIONS
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import english from 'i18n-config/lang/en.json'
import polish from 'i18n-config/lang/pl.json'

// STYLES
import 'tailwind-config/index.css'

const app = createApp(App)

// ROUTING
export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
app.use(router)

// STATE MANAGEMENT
const pinia = createPinia()
app.use(pinia)

// TRANSLATION
i18next.init({
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: english
    },
    pl: {
      translation: polish
    }
  }
})
app.use(I18NextVue, { i18next })
app.mount('#app')
