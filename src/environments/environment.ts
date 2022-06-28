// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlFirebase: 'https://market-place-363dc-default-rtdb.firebaseio.com/',
  urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  urlGetUser: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  urlFiles: 'http://localhost/Market/src/assets/img/',
  adminFiles: 'http://localhost/Market/src/assets/img/index.php?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  deleteFiles:'http://localhost/Market/src/assets/img/delete.php?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  urlRefreshToken: 'https://securetoken.googleapis.com/v1/token?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  urlEmail:'http://localhost/Market/src/assets/email/index.php?key=AIzaSyBR9IUBZFVT4l1shmmdo1FDELSCOlER3zw',
  domainMP:'http://localhost:4201/',
  nameStore:'Digitalworld Us'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
