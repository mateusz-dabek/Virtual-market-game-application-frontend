// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  endpoints: {
    apiPath: 'http://localhost:8080',
    loginPath: '/auth/login',
    registerPath: '/auth/register',
    verifyPath: '/auth/verify_code',
    passwordResetPath: '/reset_password',
    refreshPath: '/auth/refresh',
    usersPath: '/api/users',
    changePassword: '/change_password',

    openPositionPath: '/api/openPositions',
    pendingPositionPath: '/api/pendingPositions',
    transactionsHistory: '/api/transactionsHistory',
   

    forexStream: '/api/trade/forex',
    candlestickChart: '/api/trade/chart'
  },

  routerPaths: {
    login: 'login',
    register: 'register',
    homePage: '', // app.component.html
    resetPasswordPage: 'reset-password',
    resetPasswordTokenPage: 'reset-password/:id',
    exchange: 'exchange',
    account: 'account',

    notFound: 'not-found'
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
