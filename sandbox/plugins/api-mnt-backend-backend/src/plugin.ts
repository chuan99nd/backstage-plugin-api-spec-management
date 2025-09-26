import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { todoListServiceRef } from './services/TodoListService';
import { apiMntServiceRef } from './services/ApiMntService';

/**
 * apiMntBackendPlugin backend plugin
 *
 * @public
 */
export const apiMntBackendPlugin = createBackendPlugin({
  pluginId: 'api-mnt-backend',
  register(env) {
    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        todoList: todoListServiceRef,
        apiMnt: apiMntServiceRef
      },
      async init({ httpAuth, httpRouter, todoList,apiMnt }) {
        httpRouter.use(
          await createRouter({
            httpAuth,
            todoList,
            apiMnt,
          }),
        );
      },
    });
  },
});
