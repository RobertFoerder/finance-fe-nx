export const environment = {
  production: true,
  basePath: 'https://finance-app-function-app.azurewebsites.net/api',
  loginRedirectUri: 'https://eichel-finance.de',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: `${require('../../../../package.json').version}`,
};
