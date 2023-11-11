import { createApp } from 'vue'

// ROUTING
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routing/routes.js'

import 'tailwind-config/index.css'
import App from './App.vue'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import english from 'i18n-config/lang/en.json'
import polish from 'i18n-config/lang/pl.json'

const app = createApp(App)

// ROUTING
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
app.use(router)

// const RoutesWithLogin = ['Dashboard', 'Profile']

// router.beforeEach((to, from, next) => {
//   if (to.name) {
//     if (RoutesWithLogin.includes(to.name as string)) {
//       const isAuthenticated = true

//       if (isAuthenticated) {
//         next();
//       } else {
//         next({ name: 'Login' })
//       }
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

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
