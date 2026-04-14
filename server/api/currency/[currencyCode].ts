export default defineEventHandler(async (event) => {
   // **REFERENCE: currencyapi.com

    const { curApiKey } = useRuntimeConfig();
    // @ts-ignore
    const { currencyCode } = event.context.params;
    
    // @ts-ignore
    const { data:currency } = await $fetch(`https://api.currencyapi.com/v3/currencies?currencies=${currencyCode}`, {
        headers: {
            "apikey": curApiKey,
        },
    });
    return currency;
});
