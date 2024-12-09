export enum ACTIONS {
  LOGIN = 'login',
  INFO = 'info',
}

export enum VERSIONS {
  API_VERSION = 'api/v1.0',
}

export enum MODULES {
  AUTH = 'auth',
  USERS = 'users',
  ORGANIZATIONS = 'organizations',
  PROJECTS = 'projects',
  AREAS = 'areas/organization/239',
  APPLICATIONS = 'applications',
}

export interface Environment {
  production: boolean;
  apiUrl: string;
  keyCrypt: string;
  azure: {
    clientId: string;
    authority: string;
    redirectUri: string;
    clientSecret: string;
    tenantId: string;
    postLogoutRedirectUri: string;
  };
}

export const environment: Environment = {
  production: false,
  azure: {
    clientId: 'TU_ID_DE_CLIENTE',
    authority: 'https://login.microsoftonline.com/TENANT_ID',
    redirectUri: 'http://localhost:4200',
    clientSecret: 'TU_CLIENT_SECRET',
    tenantId: 'TU_TENANT_ID',
    postLogoutRedirectUri: ' http://localhost:4200/login',
  },
  apiUrl: 'https://apis-system.uqroo.mx:8443/SESO',
  keyCrypt: 'CAEC-2024-K3Y&',
};

export const urlsApis = {
  users: `${environment.apiUrl}/${MODULES.USERS}`,
  organizations: `${environment.apiUrl}/${VERSIONS.API_VERSION}/${MODULES.ORGANIZATIONS}`,
  projects: `${environment.apiUrl}/${VERSIONS.API_VERSION}/${MODULES.PROJECTS}`,
  areas: `${environment.apiUrl}/${VERSIONS.API_VERSION}/${MODULES.AREAS}`,
  api: `${environment.apiUrl}/${VERSIONS.API_VERSION}`,
  applications: `${environment.apiUrl}/${VERSIONS.API_VERSION}/${MODULES.APPLICATIONS}`,
};
