import {
    coreServices,
    createServiceFactory,
    createServiceRef,
    LoggerService,
  } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { Expand } from '@backstage/types';

export class ApiMntService {
    readonly #logger: LoggerService;
    readonly #catalog: typeof catalogServiceRef.T;

    static create(options: {
        logger: LoggerService;
        catalog: typeof catalogServiceRef.T;
    }) {
        return new ApiMntService(options.logger, options.catalog);
    }

    private constructor(
        logger: LoggerService,
        catalog: typeof catalogServiceRef.T,
    ) {
        this.#logger = logger;
        this.#catalog = catalog;
    }

    async healthcheck(): Promise<{ status: string }> {
        return { status: 'ok' };
    }

    async putVersion(): Promise<{ status: string }> {
        return { status: 'ok' };
    }

    async putFile(file:Express.Multer.File, input: {
        serviceName: string;
        version: string;
        description: string;
        releaseTime: string;
        gitlabSourceUrl: string;
    } ): Promise<{ status: string }> {
        return { status: 'ok' };
    }
    
} 

export const apiMntServiceRef = createServiceRef<Expand<ApiMntService>>({
    id: 'api.mnt',
    defaultFactory: async service =>
      createServiceFactory({
        service,
        deps: {
          logger: coreServices.logger,
          catalog: catalogServiceRef,
        },
        async factory(deps) {
          return ApiMntService.create(deps);
        },
      }),
  });