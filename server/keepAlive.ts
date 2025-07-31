import axios from 'axios';
import { log } from './vite';

interface KeepAliveConfig {
  url?: string;
  interval?: number;
  enabled?: boolean;
}

class KeepAliveService {
  private url: string;
  private interval: number;
  private enabled: boolean;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(config: KeepAliveConfig = {}) {
    // Get the URL from environment variables or use default
    this.url = config.url || 
               process.env.RENDER_EXTERNAL_URL || 
               process.env.REPLIT_URL || 
               `http://localhost:${process.env.PORT || 5000}`;
    
    // Ping every 10 minutes (600,000ms) to stay well within Render's timeout
    this.interval = config.interval || 600000; // 10 minutes
    
    // Only enable in production or when explicitly enabled
    this.enabled = config.enabled ?? (process.env.NODE_ENV === 'production');
  }

  start(): void {
    if (!this.enabled) {
      log('Keep-alive service disabled (not in production)', 'keep-alive');
      return;
    }

    if (this.intervalId) {
      log('Keep-alive service already running', 'keep-alive');
      return;
    }

    log(`Starting keep-alive service for ${this.url} every ${this.interval / 1000}s`, 'keep-alive');
    
    // Initial ping after 1 minute to let the server fully start
    setTimeout(() => {
      this.ping();
    }, 60000);

    // Set up regular pings
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.interval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      log('Keep-alive service stopped', 'keep-alive');
    }
  }

  private async ping(): Promise<void> {
    try {
      const startTime = Date.now();
      const response = await axios.get(`${this.url}/api/health`, {
        timeout: 10000, // 10 second timeout
        headers: {
          'User-Agent': 'Keep-Alive-Service/1.0'
        }
      });
      
      const duration = Date.now() - startTime;
      log(`Keep-alive ping successful: ${response.status} in ${duration}ms`, 'keep-alive');
    } catch (error) {
      const duration = Date.now() - Date.now();
      if (axios.isAxiosError(error)) {
        log(`Keep-alive ping failed: ${error.message} in ${duration}ms`, 'keep-alive');
      } else {
        log(`Keep-alive ping failed: ${String(error)}`, 'keep-alive');
      }
    }
  }

  // Get service status
  getStatus(): { enabled: boolean; url: string; interval: number; running: boolean } {
    return {
      enabled: this.enabled,
      url: this.url,
      interval: this.interval,
      running: this.intervalId !== null
    };
  }
}

// Export singleton instance
export const keepAliveService = new KeepAliveService();

// Export class for testing or custom instances
export { KeepAliveService };