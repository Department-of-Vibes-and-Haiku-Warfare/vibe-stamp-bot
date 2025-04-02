import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import { createNodeMiddleware, createProbot } from 'probot';
import app from './app.js';

// Read private key from file
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');

const probot = createProbot({
  appId: process.env.APP_ID,
  privateKey,
  secret: process.env.WEBHOOK_SECRET,
});

const server = express();

// ✅ Health check is always available
server.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// 🔌 Mount Probot GitHub App middleware
server.use(createNodeMiddleware(app, { probot }));

// 🚀 Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🔥 VibeStamp running at http://localhost:${PORT}`);
});