// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  local_url: 'http://localhost:5700',
  stripe_key: 'pk_test_51IllDFIoULcjF60KfMk1Jbb3COmYyAbZ1QLxLRMugIk3WU6p2k2nWp5YgCPTswBQqhbLjQspbDeONmOmh7z8r1hv00LOfVmm6o',
  api_rul: 'http://localhost:3000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
