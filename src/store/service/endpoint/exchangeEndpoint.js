import { exchangeApi } from "../service";

const ExchangeEndpoint= exchangeApi.injectEndpoints({
    endpoints: (builder) => ({
        getRate: builder.query({
          query: (name) => `USD`,
        }),
      }),
})

export const {useGetRateQuery}=ExchangeEndpoint