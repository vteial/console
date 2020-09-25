// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mode: 'local',
  baseApiPrefix: '/api',
  apiMockRun: true,
  apiMockHttpDelay: 1000,
  firebaseConfig: {
    apiKey: "AIzaSyCsaVLIa1xSxNJHabO_hrjltq5l8SBdD2g",
    authDomain: "bigsalesdb.firebaseapp.com",
    databaseURL: "https://bigsalesdb.firebaseio.com",
    projectId: "bigsalesdb",
    storageBucket: "bigsalesdb.appspot.com",
    messagingSenderId: "46117576131",
    appId: "1:46117576131:web:c4c967a275570231917176"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
