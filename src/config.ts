import packageDotJSON from '../package.json'

interface ConfigType {
  staticPath: string
  API_URL: string
  version?: string | undefined
}

const { static_path: staticPath } = (window as any).nfe || {} // eslint-disable-line @typescript-eslint/no-explicit-any

const debug: ConfigType = {
  staticPath: 'https://app.brms.com.br/static',  
  /* API_URL: 'http://64.225.23.255:8001/api/v1/', */
  API_URL: 'https://app.brms.com.br/api/v1/',
  version: packageDotJSON.version,
}

const homolog: ConfigType = {
  staticPath: staticPath ? staticPath.slice(0, -1) : '',  
  /* API_URL: 'http://64.225.23.255:8001/api/v1/', */
  API_URL: 'https://app.brms.com.br/api/v1/',
  version: packageDotJSON.version,
}

const production: ConfigType = {
  staticPath: staticPath ? staticPath.slice(0, -1) : '',  
  /* API_URL: 'http://64.225.23.255:8001/api/v1/', */
  API_URL: 'https://app.brms.com.br/api/v1/',
  version: packageDotJSON.version,
}

const configs = {
  debug,
  homolog,
  production,
}

// @ts-ignore
export const environment = configs[process.env.NODE_ENV || 'debug']
if (!environment) {
  console.error('No config file found.  Defaulting to debug') // eslint-disable-line no-console
}

const config: ConfigType = environment || debug

export default config
