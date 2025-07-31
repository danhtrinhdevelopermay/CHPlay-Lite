import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { keepAliveService } from "./keepAlive";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add middleware to disable caching for all API routes
  app.use('/api/*', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });

  // Get app by ID
  app.get("/api/apps/:id", async (req, res) => {
    try {
      const app = await storage.getApp(req.params.id);
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get app by name
  app.get("/api/apps/by-name/:name", async (req, res) => {
    try {
      const app = await storage.getAppByName(decodeURIComponent(req.params.name));
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all apps
  app.get("/api/apps", async (req, res) => {
    try {
      const apps = await storage.getAllApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get reviews for an app
  app.get("/api/apps/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByAppId(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get developer apps
  app.get("/api/developer/:developer/apps", async (req, res) => {
    try {
      const apps = await storage.getDeveloperApps(decodeURIComponent(req.params.developer));
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get similar apps
  app.get("/api/similar-apps", async (req, res) => {
    try {
      const apps = await storage.getSimilarApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Health check endpoint for keep-alive service
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Keep-alive service status endpoint (optional for debugging)
  app.get("/api/keep-alive/status", (req, res) => {
    res.json(keepAliveService.getStatus());
  });

  // Download APK file
  app.get("/download/twink-bsa.apk", (req, res) => {
    try {
      const apkPath = path.join(process.cwd(), "twink-bsa.apk");
      
      // Set proper headers for APK download
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', 'attachment; filename="twink-bsa.apk"');
      
      res.download(apkPath, "twink-bsa.apk", (err) => {
        if (err) {
          console.error("Error downloading APK:", err);
          // Don't send response if headers already sent
          if (!res.headersSent) {
            res.status(500).json({ message: "Error downloading APK file" });
          }
        }
      });
    } catch (error) {
      console.error("APK download error:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
