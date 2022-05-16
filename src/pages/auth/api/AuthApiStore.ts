import { apiStore } from 'store/storeApi';

const authApiStore = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    //  Query list District
    getAuthInfo: builder.query<Promise<any>, void>({
      query: () => 'auth/info',
      transformResponse: (response: Promise<any>) => {
        return response || [];
      },
      // keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetAuthInfoQuery, useLazyGetAuthInfoQuery } = authApiStore;
export default authApiStore;
