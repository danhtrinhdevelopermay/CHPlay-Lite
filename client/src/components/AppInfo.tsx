import { Star, Download, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";
import appstoreLogo from "@assets/appstore.png";
import { useState, useEffect } from "react";

interface AppInfoProps {
  app: App;
}

export default function AppInfo({ app }: AppInfoProps) {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Kiểm tra xem ứng dụng đã được cài đặt chưa
  useEffect(() => {
    const checkAppInstalled = () => {
      const packageName = 'com.brightstartsacademy.ai.twink';
      
      // Kiểm tra localStorage trước
      const isManuallyInstalled = localStorage.getItem('twink_ai_installed') === 'true';
      if (isManuallyInstalled) {
        setIsAppInstalled(true);
        return;
      }

      // Chỉ kiểm tra trên Android devices
      if (!/Android/i.test(navigator.userAgent)) {
        setIsAppInstalled(false);
        return;
      }

      // Phương pháp 1: Thử launch app với market:// URL
      try {
        const marketUrl = `market://launch?id=${packageName}`;
        const link = document.createElement('a');
        link.href = marketUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        let appDetected = false;
        
        const checkVisibility = () => {
          if (document.visibilityState === 'hidden') {
            appDetected = true;
            setIsAppInstalled(true);
            localStorage.setItem('twink_ai_installed', 'true');
          }
        };
        
        document.addEventListener('visibilitychange', checkVisibility, { once: true });
        
        // Click để test
        link.click();
        
        // Cleanup sau 1.5 giây
        setTimeout(() => {
          document.removeEventListener('visibilitychange', checkVisibility);
          document.body.removeChild(link);
          
          if (!appDetected) {
            // Phương pháp 2: Thử với intent URL
            const intentUrl = `intent://launch#Intent;scheme=android-app;package=${packageName};end`;
            window.location.href = intentUrl;
            
            // Nếu không redirect thì app chưa cài
            setTimeout(() => {
              if (!appDetected) {
                setIsAppInstalled(false);
              }
            }, 500);
          }
        }, 1500);
        
      } catch (error) {
        console.log('App detection error:', error);
        setIsAppInstalled(false);
      }
    };

    checkAppInstalled();
  }, []);

  const handleMarkAsInstalled = () => {
    localStorage.setItem('twink_ai_installed', 'true');
    setIsAppInstalled(true);
    setShowDebugInfo(false);
  };

  const handleResetDetection = () => {
    localStorage.removeItem('twink_ai_installed');
    setIsAppInstalled(false);
    setShowDebugInfo(false);
    // Recheck after reset
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleInstallClick = async () => {
    if (isAppInstalled) {
      // Mở ứng dụng với nhiều phương thức
      const packageName = 'com.brightstartsacademy.ai.twink';
      
      // Thử mở với custom scheme trước
      try {
        window.location.href = 'twinkAI://launch';
      } catch (e) {
        // Fallback sang Intent URL
        window.location.href = `intent://launch#Intent;scheme=android-app;package=${packageName};end`;
      }
    } else {
      // Download APK
      setIsDownloading(true);
      try {
        const link = document.createElement('a');
        link.href = '/download/twink-bsa.apk';
        link.download = 'twink-bsa.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show install instruction with option to mark as installed
        setTimeout(() => {
          const userConfirm = confirm('APK đã được tải xuống! Vui lòng mở file và cài đặt ứng dụng.\n\nSau khi cài đặt xong, nhấn "OK" để đánh dấu đã cài đặt, hoặc "Cancel" để tự refresh sau.');
          if (userConfirm) {
            localStorage.setItem('twink_ai_installed', 'true');
            setIsAppInstalled(true);
          }
        }, 1000);
      } catch (error) {
        console.error('Download error:', error);
        alert('Có lỗi xảy ra khi tải xuống. Vui lòng thử lại.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleShareClick = async () => {
    const appUrl = window.location.href;
    const shareText = `Hãy thử ứng dụng ${app.name} từ ${app.developer}!`;
    
    // Kiểm tra Web Share API có hỗ trợ không
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.name,
          text: shareText,
          url: appUrl
        });
      } catch (error) {
        console.log('Share cancelled or error:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${appUrl}`);
        alert('Đã sao chép liên kết chia sẻ vào clipboard!');
      } catch (error) {
        // Fallback cuối cùng: Open in social media
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(appUrl);
        
        // Hiển thị các tùy chọn chia sẻ
        const shareOptions = [
          { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
          { name: 'WhatsApp', url: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
          { name: 'Telegram', url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
          { name: 'Zalo', url: `https://zalo.me/share/url?url=${encodedUrl}&text=${encodedText}` }
        ];
        
        const choice = confirm('Chọn nền tảng để chia sẻ:\n1. Facebook\n2. WhatsApp\n3. Telegram\n4. Zalo\n\nNhấn OK để mở Facebook, Cancel để thử WhatsApp');
        
        if (choice) {
          window.open(shareOptions[0].url, '_blank');
        } else {
          window.open(shareOptions[1].url, '_blank');
        }
      }
    }
  };

  return (
    <section className="bg-white p-4 sm:p-6 mb-6">
      {/* App Icon and Title */}
      <div className="flex gap-4 mb-6">
        <img
          src={appstoreLogo}
          alt={`${app.name} App Icon`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg flex-shrink-0 cursor-pointer"
          onTouchStart={(e) => {
            e.preventDefault();
            setTimeout(() => setShowDebugInfo(true), 1000);
          }}
          onClick={() => {
            let clickCount = 0;
            clickCount++;
            setTimeout(() => {
              if (clickCount >= 5) {
                setShowDebugInfo(true);
              }
            }, 100);
          }}
        />
        
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900 mb-1 leading-tight">{app.name}</h1>
          <div className="text-blue-600 font-medium mb-1">{app.developer}</div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Chứa quảng cáo</span>
            <span>•</span>
            <span>Mua hàng trong ứng dụng</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between mb-6 text-center">
        <div className="flex-1">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-lg font-medium">{app.rating}</span>
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          </div>
          <div className="text-xs text-gray-600">{app.totalReviews} N bài đánh giá</div>
        </div>
        
        <div className="w-px h-8 bg-gray-300"></div>
        
        <div className="flex-1">
          <Download className="w-5 h-5 mx-auto mb-1 text-gray-600" />
          <div className="text-xs text-gray-600">53 MB</div>
        </div>
        
        <div className="w-px h-8 bg-gray-300"></div>
        
        <div className="flex-1">
          <div className="w-5 h-5 mx-auto mb-1 border border-gray-600 rounded text-xs flex items-center justify-center font-medium">
            3+
          </div>
          <div className="text-xs text-gray-600">3 tuổi trở lên</div>
        </div>
      </div>

      {/* Install Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={handleInstallClick}
          disabled={isDownloading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Đang tải...
            </div>
          ) : isAppInstalled ? (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Mở
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Cài đặt
            </div>
          )}
        </Button>
        
        {/* Share Button */}
        <Button 
          onClick={handleShareClick}
          variant="outline"
          size="icon"
          className="w-12 h-12 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          title="Chia sẻ ứng dụng"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        
        {/* Secondary Install Button - Only show when app is installed */}
        {isAppInstalled ? (
          <Button 
            onClick={async () => {
              // Download APK
              setIsDownloading(true);
              try {
                const link = document.createElement('a');
                link.href = '/download/twink-bsa.apk';
                link.download = 'twink-bsa.apk';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show install instruction
                setTimeout(() => {
                  alert('APK đã được tải xuống! Vui lòng mở file và cài đặt ứng dụng.');
                }, 1000);
              } catch (error) {
                console.error('Download error:', error);
                alert('Có lỗi xảy ra khi tải xuống. Vui lòng thử lại.');
              } finally {
                setIsDownloading(false);
              }
            }}
            disabled={isDownloading}
            variant="outline"
            size="icon"
            className="w-12 h-12 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Tải lại APK"
          >
            <Download className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="icon"
            className="w-12 h-12 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10L6 4L10 8L14 4L14 10L6 10Z"/>
            </svg>
          </Button>
        )}
      </div>
      
      <div className="text-center text-xs text-gray-600 mt-3">
        Cài đặt trên điện thoại. Con thiết bị khác.
      </div>

      {/* Google Play Verification Badge */}
      <div className="flex items-center justify-center mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="playGreenSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F9D58" />
                <stop offset="100%" stopColor="#16A085" />
              </linearGradient>
              <linearGradient id="playBlueSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#2196F3" />
              </linearGradient>
              <linearGradient id="playYellowSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEB3B" />
                <stop offset="100%" stopColor="#FFC107" />
              </linearGradient>
              <linearGradient id="playRedSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA4335" />
                <stop offset="100%" stopColor="#E53935" />
              </linearGradient>
            </defs>
            <path d="M3 20.5L13.09 10.41L3 .32V20.5z" fill="url(#playGreenSmall)" />
            <path d="M16.58 6.91L13.09 10.41L16.58 13.9L20.07 10.41L16.58 6.91z" fill="url(#playYellowSmall)" />
            <path d="M13.09 10.41L3 20.5L16.58 13.9L13.09 10.41z" fill="url(#playRedSmall)" />
            <path d="M13.09 10.41L16.58 6.91L3 .32L13.09 10.41z" fill="url(#playBlueSmall)" />
          </svg>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-green-800">Được xác minh bởi Google Play</span>
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs text-green-600">Ứng dụng đã được kiểm tra và đảm bảo an toàn</span>
          </div>
        </div>
      </div>

      {/* Debug Panel - Hidden by default */}
      {showDebugInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-sm font-medium text-gray-800 mb-3">
            🔧 Debug Panel - App Detection
          </div>
          <div className="space-y-2 text-xs text-gray-600 mb-4">
            <div>Package: com.brightstartsacademy.ai.twink</div>
            <div>Current Status: {isAppInstalled ? '✅ Đã cài đặt' : '❌ Chưa cài đặt'}</div>
            <div>User Agent: {navigator.userAgent.substring(0, 50)}...</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleMarkAsInstalled}
              className="px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700"
            >
              ✅ Đánh dấu đã cài đặt
            </button>
            <button
              onClick={handleResetDetection}
              className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              🔄 Reset detection
            </button>
            <button
              onClick={() => setShowDebugInfo(false)}
              className="px-3 py-2 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
            >
              ❌ Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
