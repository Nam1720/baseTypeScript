import { countryModel, districtModel, provinceModel } from './interface';
import { apiStore } from 'store/storeApi';

const LocationApiStore = apiStore.injectEndpoints({
  endpoints: (builder) => ({
    getCountry: builder.query<countryModel[], void>({
      query: () => 'country-options',
      transformResponse: (response: Promise<countryModel[]>) => {
        return response || [];
      },
      keepUnusedDataFor: 5,
    }),
    getProvince: builder.query<provinceModel[], void>({
      query: () => 'province-options',
      transformResponse: (response: Promise<provinceModel[]>) => {
        return response || [];
      },
      keepUnusedDataFor: 5,
    }),
    // getProvinceId: builder.mutation<void, number>({
    //   query(payload)
    // }),
    getDistrict: builder.mutation<districtModel[], number>({
      query: (id) => {
        return {
          url: 'district-options',
          method: 'GET',
          params: { province_id: id },
        };
      },
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map((item) => ({ type: 'district', id: item.id } as const)),
      //         { type: 'district', id: 'LIST_DISTRICT' },
      //       ]
      //     : [{ type: 'district', id: 'LIST_DISTRICT' }],
      transformResponse: (response: Promise<districtModel[]>) => {
        return response || [];
      },
    }),
  }),
});
export const { useGetCountryQuery, useGetDistrictMutation, useGetProvinceQuery } = LocationApiStore;
export default LocationApiStore;
