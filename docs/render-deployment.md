# Render Deployment Guide

## Anti-Spin Down Configuration

This application includes an integrated anti-spin down solution to prevent Render free tier instances from going to sleep due to inactivity.

### How It Works

The keep-alive service automatically pings your application every 10 minutes to maintain activity and prevent the 15-minute inactivity timeout on Render's free tier.

### Features

- **Automatic Activation**: Only runs in production environment
- **Smart Health Checks**: Uses a dedicated `/api/health` endpoint
- **Configurable Intervals**: Default 10-minute interval (customizable)
- **Environment Detection**: Auto-detects Render URLs via environment variables
- **Graceful Shutdown**: Properly stops during server shutdown
- **Comprehensive Logging**: Detailed logs for monitoring ping status

### Environment Variables

The keep-alive service automatically detects your deployment URL from these environment variables (in order of preference):

1. `RENDER_EXTERNAL_URL` - Render's external URL
2. `REPLIT_URL` - Replit's deployment URL
3. Falls back to `http://localhost:${PORT}` for local development

### Configuration Options

You can customize the keep-alive service by setting these environment variables:

```bash
# Enable/disable the service (default: only in production)
KEEP_ALIVE_ENABLED=true

# Custom ping interval in milliseconds (default: 600000 = 10 minutes)
KEEP_ALIVE_INTERVAL=300000

# Custom URL to ping (default: auto-detected)
KEEP_ALIVE_URL=https://your-app.onrender.com
```

### Deployment Steps for Render

1. **Create New Web Service** on Render
2. **Connect Your Repository**
3. **Configure Build & Start Commands**:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
4. **Set Environment Variables**:
   - `NODE_ENV=production`
   - Any other required environment variables (database, etc.)
5. **Deploy** - The keep-alive service will automatically start

### Monitoring

Check your Render logs to see keep-alive activity:

```
[keep-alive] Starting keep-alive service for https://your-app.onrender.com every 600s
[keep-alive] Keep-alive ping successful: 200 in 245ms
```

### API Endpoints

- `GET /api/health` - Health check endpoint (used by keep-alive service)
- `GET /api/keep-alive/status` - Service status and configuration

### Manual Testing

You can test the health endpoint manually:

```bash
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-31T12:00:00.000Z",
  "uptime": 3600.5,
  "memory": { "rss": 52428800, "heapTotal": 20971520, "heapUsed": 15728640, "external": 1638400 },
  "environment": "production"
}
```

### Benefits

- **Zero Downtime**: Prevents cold starts and slow responses
- **Free Tier Optimization**: Maximizes value from Render's free hosting
- **User Experience**: Maintains fast response times
- **Simple Setup**: Works out of the box with zero configuration
- **Resource Efficient**: Minimal overhead with smart timing

### Important Notes

- The service only activates in production to avoid unnecessary pings during development
- Uses a 10-minute interval to stay well within Render's 15-minute timeout
- Includes proper error handling and retry logic
- Automatically stops during graceful shutdowns