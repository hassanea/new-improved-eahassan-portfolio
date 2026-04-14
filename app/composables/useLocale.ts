
import type { Ref, MaybeRefOrGetter } from 'vue';
import { computed, toValue, unref } from 'vue';
// import localeList from '@/assets/data/locales.json';
// ** REFERENCE: https://saimana.com/list-of-country-locale-code/
// ** REFERENCE: https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes
// ** REFERENCE: https://stackoverflow.com/questions/52549577/javascript-get-the-complete-list-of-locales-supported-by-the-browser

export const useDefaultLocale = (fallback = 'en-US') => {
  const locale = ref(fallback);
  if (import.meta.server) {
    const reqLocale = useRequestHeaders()['accept-language']?.split(',')[0];
    if (reqLocale) {
      locale.value = reqLocale;
    }
  } else if (import.meta.client) {
    const navLang = navigator.language;
    if (navLang) {
      locale.value = navLang;
    }
  }
  return locale;
};

export const useLocale = () => {


const currentLocale = useState<string>('locale', () => useDefaultLocale().value);

const preferredLanguages = useState('languages', () => navigator?.languages);
    
  const localeCookie = useCookie('locale', {
    default: () => {
      return '';
    },
    watch: true,
  })

  const currentWritingDirection = computed(() => {
    if(!currentLocale.value) return '';
    else return (currentLocale.value === 'ar' || currentLocale.value === 'dv' || currentLocale.value === 'he') ? 'rtl' : 'ltr';
 });

  return {
    currentLocale,
    preferredLanguages,
    localeCookie,
    currentWritingDirection,
  };
};

// export const useDefaultCurrency = (fallback = 'USD', locale = useLocale()) => {
//   const currency = ref(fallback);
// }; 



// export const useLocales = () => {
//   const locale = useLocale()
//   const locales = ref([
//     'en-US',
//     'en-GB',
//     'pl-PL',
//     'fr-FR',
//     'es-ES',
//     'ja-JP-u-ca-japanese'
//   ])
//   if (locales.value.includes(locale.value)) {
//     return locales.value.unshift(locale.value)
//   }
//   return locales;
// };

// ** REFERENCE: https://www.freecodecamp.org/news/format-dates-with-ordinal-number-suffixes-javascript/

export const useNthNumber = (number: Ref<Number> | Ref<String> | number | string | any) => {
  computed(() => {
  if (number > 3 && number < 21) return "th";
  switch (number % 1) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
});
};

export const useGetDate = (dateStr: Ref<String> | string, replacement: Ref<String> | string) => {
  // @ts-ignore
  return computed(() => { dateStr?.match(/(\d{1,2}\,)/g)?.pop()});
//  ?.replace(/\,/g, replacement) ?? 0 });
};

// ** REFERENCE: https://dev.to/diorla/a-guide-to-date-and-time-formatting-in-javascript-2ol2

export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
  // @ts-ignore  
  return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(unref(date)));
};
  
  export const useLocaleTimeShort = function(date: Ref<Date> | Date, locale = useLocale()) {
    // @ts-ignore
    return computed(() => new Intl.DateTimeFormat(locale.value, { timeStyle: "short" }).format(unref(date)));
  };
  
  export const useLocaleTimeFull = function(date: Ref<Date> | Date, locale = useLocale()) {
    // @ts-ignore
    return computed(() => new Intl.DateTimeFormat(locale.value, { timeStyle: "full" }).format(unref(date)));
  };


  export const useLocaleNumber = function(number: MaybeRefOrGetter<Number> | Number, locale = useLocale(), styleFormat: string = 'decimal', currency: string = 'USD', currencyFormat: string = 'symbol', currencySign: string = 'standard', unitFormat: string = 'short') {
    // @ts-ignore
    return computed(() => toValue(number).toLocaleString(locale.value, { style: styleFormat, currency: currency, currencyDisplay: currencyFormat, currencySign: currencySign, unitDisplay: unitFormat }));
  };

  export const useLocaleCase = function(str: MaybeRefOrGetter<String> | String, casing: string = 'lower', locale = useLocale()) {
    // @ts-ignore
    return computed(() => casing === 'lower' ? toValue(str).toLocaleLowerCase(locale) : toValue(str).toLocaleUpperCase(locale));
  };

  // String.prototype.localeCompare();
  export const useLocaleCompare = function() {
    // @ts-ignore
  };

  // BigInt.prototype.toLocaleString();
  export const useLocaleBigInt = function() {
   // @ts-ignore
  };

  // Object.prototype.toLocaleString();
  export const useLocaleObject = function() {
  // @ts-ignore  
  };

  // Array.prototype.toLocaleString();
  export const useLocaleArray = function() {
  // @ts-ignore
  };