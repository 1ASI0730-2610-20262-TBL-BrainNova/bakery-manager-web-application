/**
 * @summary Development environment configuration.
 * @author u20241a195 - Sofia Diaz Yurivilca
 */
export const environment = {
  production: false,
  bakeryManagerProviderApiBaseUrl: 'https://bakery-manager-platform-pkoa.onrender.com/api/v1',
  productionProviderBatchesEndpointPath: '/productionBatches',
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  platformProviderSignInEndpointPath: '/sign-in',
  platformProviderSignUpEndpointPath: '/sign-up',
  monitoringProviderAlertsEndpointPath: '/alerts',
  monitoringProviderIncidentsEndpointPath: '/incidents',
  monitoringProviderSensorsEndpointPath: '/sensors',
};
