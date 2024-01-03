export const environment = {
  production: false,
  basePath: '//localhost:3000',
  loginRedirectUri: 'http://localhost:4200',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: `v${require('../../../../package.json').version}dev`,
};

import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
