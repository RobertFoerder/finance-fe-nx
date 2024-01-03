// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import packageJson from '../../../../package.json';

export const environment = {
  production: false,
  basePath: '//localhost:3000',
  loginRedirectUri: 'http://localhost:4200',
  appVersion: packageJson.version + '-dev',
};

import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
