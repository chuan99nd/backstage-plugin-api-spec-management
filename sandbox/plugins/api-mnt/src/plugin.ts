import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { createRouteRef } from '@backstage/core-plugin-api';

export const apiMntPlugin = createPlugin({
  id: 'api-mnt',
  routes: {
    root: rootRouteRef,
  },
});

export const apiSpecRouteRef = createRouteRef({
  id: 'api-spec',
});

export const apiSpectPlugin = createPlugin({
  id: 'api-spec',
  routes: {
    view: apiSpecRouteRef,
  },
});


export const ApiMntPage = apiMntPlugin.provide(
  createRoutableExtension({
    name: 'ApiMntPage',
    component: () =>
      import('./components/DashboardComponent').then(m => m.DashboardComponent),
    mountPoint: rootRouteRef,
  }),
);

export const ApiSpecPage = apiSpectPlugin.provide(
  createRoutableExtension({
    name: 'ApiSpecPage',
    component: () =>
      import('./components/ApiSpecPage/ApiSpecPage').then(m => m.ApiSpecPage),
    mountPoint: apiSpecRouteRef,
  }),
);