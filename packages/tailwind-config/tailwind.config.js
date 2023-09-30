const colors = require('tailwindcss/colors');

function withOpacity(variable) {
  return opacity => {
    if (opacity !== undefined) return `rgba(var(${variable}), ${opacity.opacityValue})`;
    return `rgb(var(${variable})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-light': withOpacity('--primary-light'),
        'primary-medium': withOpacity('--primary-medium'),
        'primary-dark': withOpacity('--primary-dark'),
        'accent-1': withOpacity('--accent-1'),
        'accent-2': withOpacity('--accent-2'),
        'accent-3': withOpacity('--accent-3'),
        'accent-1-hover': withOpacity('--accent-1-hover'),
        'accent-2-hover': withOpacity('--accent-2-hover'),
        'accent-3-hover': withOpacity('--accent-3-hover'),
        'font-light': withOpacity('--font-light'),
        'font-dark': withOpacity('--font-dark'),
        'neutral-light': withOpacity('--neutral-light'),
        neutral: withOpacity('--neutral'),
        'neutral-dark': withOpacity('--neutral-dark'),
        'neutral-hover': withOpacity('--neutral-hover'),
      },
    },
  },
  plugins: [],
};
