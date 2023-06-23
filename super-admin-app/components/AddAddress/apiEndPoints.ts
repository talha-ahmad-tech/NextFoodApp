const ApiPrefix = '/api/app/';
// const { _env_ } = window as any;

export const BASEURL = 'https://setup.preview.fridaypos.com/';

export const ApiEndPoint = {
  GetCountries: ApiPrefix + 'country/countries',
  GetStates: (id: number) => ApiPrefix + `country/states?Id=${id}`,
  GetCities: (id: number) => ApiPrefix + `country/cities?Id=${id}`,
};
