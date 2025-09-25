// Minimal service for api-spec-management backend plugin

import { Router } from 'express';
import express from 'express';

export async function createRouter(): Promise<Router> {
  const router = express.Router();
  router.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });
  return router;
}