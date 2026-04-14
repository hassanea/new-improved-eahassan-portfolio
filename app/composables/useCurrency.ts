import { ref } from 'vue';
import { useLocale } from '@/composables/useLocale';
import currencyList from '@/assets/data/currencies';

export const useCurrency = (locale = useLocale()) => {
    // @ts-ignore

    const { currentLocale } = locale;
    const currencies = ref(currencyList);
    const currencyResult = currencies.value.find(tender => tender[currentLocale.value]);

    const currency = useState('currency', () => currencyResult[currentLocale.value] || 'USD');

    return { currency, currencies };
  };

