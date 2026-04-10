// eslint-disable-next-line @nx/enforce-module-boundaries
import packageJson from '../../../../package.json';

export const environment = {
  production: true,
  basePath: 'https://finance-app-function-app.azurewebsites.net/api',
  loginRedirectUri: 'https://eichel-finance.de',
  appVersion: `${packageJson.version}`,
};
