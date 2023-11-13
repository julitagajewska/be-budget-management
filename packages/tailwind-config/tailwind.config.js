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
      fontFamily: {
        slab: ['Roboto Slab', 'serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      // colors: {
      //   text: {
      //     50: 'var(--text-50)',
      //     100: 'var(--text-100)',
      //     200: 'var(--text-200)',
      //     300: 'var(--text-300)',
      //     400: 'var(--text-400)',
      //     500: 'var(--text-500)',
      //     600: 'var(--text-600)',
      //     700: 'var(--text-700)',
      //     800: 'var(--text-800)',
      //     900: 'var(--text-900)',
      //     950: 'var(--text-950)',
      //   },
      //   background: {
      //     50: 'var(--background-50)',
      //     100: 'var(--background-100)',
      //     200: 'var(--background-200)',
      //     300: 'var(--background-300)',
      //     400: 'var(--background-400)',
      //     500: 'var(--background-500)',
      //     600: 'var(--background-600)',
      //     700: 'var(--background-700)',
      //     800: 'var(--background-800)',
      //     900: 'var(--background-900)',
      //     950: 'var(--background-950)',
      //   },
      //   primary: {
      //     50: 'var(--primary-50)',
      //     100: 'var(--primary-100)',
      //     200: 'var(--primary-200)',
      //     300: 'var(--primary-300)',
      //     400: 'var(--primary-400)',
      //     500: 'var(--primary-500)',
      //     600: 'var(--primary-600)',
      //     700: 'var(--primary-700)',
      //     800: 'var(--primary-800)',
      //     900: 'var(--primary-900)',
      //     950: 'var(--primary-950)',
      //   },
      //   secondary: {
      //     50: 'var(--secondary-50)',
      //     100: 'var(--secondary-100)',
      //     200: 'var(--secondary-200)',
      //     300: 'var(--secondary-300)',
      //     400: 'var(--secondary-400)',
      //     500: 'var(--secondary-500)',
      //     600: 'var(--secondary-600)',
      //     700: 'var(--secondary-700)',
      //     800: 'var(--secondary-800)',
      //     900: 'var(--secondary-900)',
      //     950: 'var(--secondary-950)',
      //   },
      //   accent: {
      //     50: 'var(--accent-50)',
      //     100: 'var(--accent-100)',
      //     200: 'var(--accent-200)',
      //     300: 'var(--accent-300)',
      //     400: 'var(--accent-400)',
      //     500: 'var(--accent-500)',
      //     600: 'var(--accent-600)',
      //     700: 'var(--accent-700)',
      //     800: 'var(--accent-800)',
      //     900: 'var(--accent-900)',
      //     950: 'var(--accent-950)',
      //   },
      // },
    },
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            primary: {
              // here I'm specifying a custom default
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
