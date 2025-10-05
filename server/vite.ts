import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}

export async function setupVite(app: Express) {
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: {
        host: 'localhost',
      }
    },
    appType: "custom",
    optimizeDeps: {
      include: ['@shared/schema']
    },
    resolve: {
      alias: {
        '@shared': path.resolve(process.cwd(), 'shared'),
      }
    }
  });

  app.use(vite.middlewares);

  app.get(/(.*)/,async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(process.cwd(), "index.html"),
        "utf-8",
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
