const colors = require('tailwindcss/colors');

import { reactLight } from './themes/react-light';
import { reactDark } from './themes/react-dark';
import { vueLight } from './themes/vue-light';
import { vueDark } from './themes/vue-dark';
import { qwikLight } from './themes/qwik-light';
import { qwikDark } from './themes/qwik-dark';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        sm: '0.833rem',
        base: '1rem',
        md: '1.1rem',
        lg: '1.200rem',
        'xl': '1.440rem',
        '2xl': '1.728rem',
        '3xl': '2.074rem',
        '4xl': '2.489rem',
    },
      fontFamily: {
        slab: ['Roboto Slab', 'serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            primary: {
              500: 'yellow',
            },
            secondary: {
              500: 'red',
            },
          },
        },
      },
      themes: [
        {
          name: 'vue-light',
          extend: {
            colors: {
              text: { ...vueLight.text },
              background: { ...vueLight.background },
              primary: { ...vueLight.primary },
              secondary: { ...vueLight.secondary },
              accent: { ...vueLight.accent },
            },
          },
        },
        {
          name: 'react-light',
          extend: {
            colors: {
              text: { ...reactLight.text },
              background: { ...reactLight.background },
              primary: { ...reactLight.primary },
              secondary: { ...reactLight.secondary },
              accent: { ...reactLight.accent },
            },
          },
        },
        {
          name: 'qwik-light',
          extend: {
            colors: {
              text: { ...qwikLight.text },
              background: { ...qwikLight.background },
              primary: { ...qwikLight.primary },
              secondary: { ...qwikLight.secondary },
              accent: { ...qwikLight.accent },
            },
          },
        },
        {
          name: 'vue-dark',
          extend: {
            colors: {
              text: { ...vueDark.text },
              background: { ...vueDark.background },
              primary: { ...vueDark.primary },
              secondary: { ...vueDark.secondary },
              accent: { ...vueDark.accent },
            },
          },
        },
        {
          name: 'react-dark',
          extend: {
            colors: {
              text: { ...reactDark.text },
              background: { ...reactDark.background },
              primary: { ...reactDark.primary },
              secondary: { ...reactDark.secondary },
              accent: { ...reactDark.accent },
            },
          },
        },
        {
          name: 'qwik-dark',
          extend: {
            colors: {
              text: { ...qwikDark.text },
              background: { ...qwikDark.background },
              primary: { ...qwikDark.primary },
              secondary: { ...qwikDark.secondary },
              accent: { ...qwikDark.accent },
            },
          },
        },
      ],
    }),
  ],
};
