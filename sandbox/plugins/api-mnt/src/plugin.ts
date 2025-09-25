import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const apiMntPlugin = createPlugin({
  id: 'api-mnt',
  routes: {
    root: rootRouteRef,
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
