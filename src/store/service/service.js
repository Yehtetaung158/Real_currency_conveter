import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exchangeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v6.exchangerate-api.com/v6/0f789f95abec70df59db099f/latest/' }),
  endpoints: (builder) => ({}),
})

// export const { useGetPokemonByNameQuery } = exchangeApi