import { environment } from './../../../environments/environment';

export const ENV_VARIABLES = {
  API_URL: environment.production ? 'https://1274.fr/api/' : 'http://localhost:3000/'
}
