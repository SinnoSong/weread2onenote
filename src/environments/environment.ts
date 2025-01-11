// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '7dbdbe86-a32b-4f48-8477-531554f7fa53',
      authority: 'https://login.microsoftonline.com/consumers',
    },
  },
  apiConfig: {
    scopes: ['user.read', 'Notes.ReadWrite', 'offline_access'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
