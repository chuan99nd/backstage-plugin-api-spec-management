import { createDevApp } from '@backstage/dev-utils';
import { apiMntPlugin, ApiMntPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apiMntPlugin)
  .addPage({
    element: <ApiMntPage />,
    title: 'Root Page',
    path: '/api-mnt',
  })
  .render();
