import { createDevApp } from '@backstage/dev-utils';
import { apiMntPlugin, ApiMntPage, ApiSpecPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apiMntPlugin)
  .addPage({
    element: <ApiSpecPage />,
    title: 'API Spec',
    path: '/api-spec',
  })
  .addPage({
    element: <ApiMntPage />,
    title: 'Root Page',
    path: '/api-mnt',
  })
  .render();
