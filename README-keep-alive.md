# 🔄 Anti-Spin Down Feature for Render

This Google Play Store clone now includes an integrated anti-spin down solution to prevent Render free tier instances from going to sleep due to inactivity.

## ✨ Features

- **🚀 Automatic Activation**: Only runs in production environment
- **💓 Smart Health Checks**: Uses dedicated `/api/health` endpoint  
- **⏰ Configurable Intervals**: Default 10-minute interval (customizable)
- **🔍 Auto-Detection**: Detects Render URLs via environment variables
- **🛠️ Graceful Shutdown**: Properly stops during server shutdown
- **📊 Comprehensive Logging**: Detailed logs for monitoring ping status

## 🎯 How It Works

The keep-alive service pings your application every 10 minutes to maintain activity and prevent the 15-minute inactivity timeout on Render's free tier.

### Environment Detection
Automatically detects deployment URL from these environment variables:
1. `RENDER_EXTERNAL_URL` - Render's external URL
2. `REPLIT_URL` - Replit's deployment URL  
3. Falls back to `http://localhost:${PORT}` for local development

## 🛠️ Configuration

Set these environment variables to customize behavior:

```bash
# Enable/disable the service (default: only in production)
KEEP_ALIVE_ENABLED=true

# Custom ping interval in milliseconds (default: 600000 = 10 minutes)  
KEEP_ALIVE_INTERVAL=300000

# Custom URL to ping (default: auto-detected)
KEEP_ALIVE_URL=https://your-app.onrender.com
```

## 🚀 Render Deployment

1. **Create New Web Service** on Render
2. **Connect Your Repository**
3. **Configure Commands**:
   - Build: `npm run build`
   - Start: `npm run start`
4. **Set Environment Variables**:
   - `NODE_ENV=production`
   - Any database/API keys as needed
5. **Deploy** - Keep-alive starts automatically!

## 📊 Monitoring

### Production Logs
```
[keep-alive] Starting keep-alive service for https://your-app.onrender.com every 600s
[keep-alive] Keep-alive ping successful: 200 in 245ms
```

### API Endpoints
- `GET /api/health` - Health check (used by keep-alive)
- `GET /api/keep-alive/status` - Service status and config

### Test Health Endpoint
```bash
curl https://your-app.onrender.com/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-31T12:00:00.000Z", 
  "uptime": 3600.5,
  "memory": { "rss": 52428800, "heapTotal": 20971520, "heapUsed": 15728640, "external": 1638400 },
  "environment": "production"
}
```

## 💡 Benefits

- **✅ Zero Downtime**: Prevents cold starts and slow responses
- **💰 Free Tier Optimization**: Maximizes value from Render's free hosting  
- **⚡ User Experience**: Maintains fast response times
- **🔧 Simple Setup**: Works out of the box with zero configuration
- **🪶 Resource Efficient**: Minimal overhead with smart timing

## 🔧 Development vs Production

- **Development**: Service disabled to avoid unnecessary pings
- **Production**: Service automatically enabled and starts pinging

## 🛡️ Error Handling

The service includes comprehensive error handling:
- Timeout protection (10-second request timeout)
- Axios error catching and logging
- Graceful failure without crashing the application
- Proper cleanup during server shutdown

## 🎮 Testing Locally

The keep-alive service is disabled in development mode, but you can test the endpoints:

```bash
# Check health endpoint
curl -H "Accept: application/json" http://localhost:5000/api/health

# Check service status  
curl -H "Accept: application/json" http://localhost:5000/api/keep-alive/status
```

## 📁 Implementation Files

- `server/keepAlive.ts` - Main keep-alive service class
- `server/routes.ts` - Health and status API endpoints
- `server/index.ts` - Integration and startup logic
- `docs/render-deployment.md` - Detailed deployment guide

The anti-spin down feature is now fully integrated and ready for Render deployment! 🎉