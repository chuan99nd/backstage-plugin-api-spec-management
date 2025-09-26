import { HttpAuthService, DatabaseService, resolvePackagePath } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import multer from 'multer';
import { apiMntServiceRef as apiMntServiceRef } from './services/ApiMntService';

export async function createRouter({
  httpAuth,
  apiMnt,
  database,
}: {
  httpAuth: HttpAuthService;
  apiMnt: typeof apiMntServiceRef.T;
  database: DatabaseService
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());
  const upload = multer({ storage: multer.memoryStorage() });

  const client = await database.getClient();
  const migrationDir = resolvePackagePath(
    '@chuan/plugin-api-mnt-backend-backend',
    'migrations'
  )
  console.log('migrationDir', migrationDir);
  if (!database.migrations?.skip) {
    console.log('Applying migrations...');
    await client.migrate.latest({
      directory: migrationDir,
    });
  }

  // TEMPLATE NOTE:
  // Zod is a powerful library for data validation and recommended in particular
  // for user-defined schemas. In this case we use it for input validation too.
  //
  // If you want to define a schema for your API we recommend using Backstage's
  // OpenAPI tooling: https://backstage.io/docs/next/openapi/01-getting-started
  // const todoSchema = z.object({
  //   title: z.string(),
  //   entityRef: z.string().optional(),
  // });

  // router.post('/todos', async (req, res) => {
  //   const parsed = todoSchema.safeParse(req.body);
  //   if (!parsed.success) {
  //     throw new InputError(parsed.error.toString());
  //   }

  //   const result = await todoList.createTodo(parsed.data, {
  //     credentials: await httpAuth.credentials(req, { allow: ['user'] }),
  //   });

  //   res.status(201).json(result);
  // });

  router.post("/putVersion",upload.single('file') as unknown as express.RequestHandler, async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const info = req.body.info ? JSON.parse(req.body.info) : {};
    res.json(await apiMnt.putVersion());
  });

  return router;
}
