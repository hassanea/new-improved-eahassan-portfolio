// **REFERENCE: https://stylelint.io/

import configTailwindcss from '@dreamsicle.io/stylelint-config-tailwindcss/dist/stylelint.config.mjs';
/** @type {import("stylelint").Config} */
export default {
  extends: [
    'stylelint-config-standard',
    '@dreamsicle.io/stylelint-config-tailwindcss',
    'stylelint-config-recommended-vue',
  ],
  languageOptions: {
    ...configTailwindcss.languageOptions,
    syntax: {
      ...configTailwindcss.languageOptions.syntax,
      types: {
        ...configTailwindcss.languageOptions.syntax.types,
      },
      properties: {
        ...configTailwindcss.languageOptions.syntax.properties,
      },
      atRules: {
        ...configTailwindcss.languageOptions.syntax.atRules,
      },
    },
  },
  rules: {
    ...configTailwindcss.rules,
  },
};
