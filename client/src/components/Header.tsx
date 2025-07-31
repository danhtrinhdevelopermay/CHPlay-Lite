import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-100"
          onClick={() => window.open('https://play.google.com/store', '_blank')}
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        
        {/* Google Play Logo - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:flex items-center space-x-3">
          <a 
            href="https://play.google.com/store" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            {/* Google Play Logo SVG */}
            <div className="flex items-center space-x-2">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="playGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F9D58" />
                    <stop offset="100%" stopColor="#16A085" />
                  </linearGradient>
                  <linearGradient id="playBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285F4" />
                    <stop offset="100%" stopColor="#2196F3" />
                  </linearGradient>
                  <linearGradient id="playYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEB3B" />
                    <stop offset="100%" stopColor="#FFC107" />
                  </linearGradient>
                  <linearGradient id="playRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EA4335" />
                    <stop offset="100%" stopColor="#E53935" />
                  </linearGradient>
                </defs>
                {/* Play Store triangle logo */}
                <path d="M3 20.5L13.09 10.41L3 .32V20.5z" fill="url(#playGreen)" />
                <path d="M16.58 6.91L13.09 10.41L16.58 13.9L20.07 10.41L16.58 6.91z" fill="url(#playYellow)" />
                <path d="M13.09 10.41L3 20.5L16.58 13.9L13.09 10.41z" fill="url(#playRed)" />
                <path d="M13.09 10.41L16.58 6.91L3 .32L13.09 10.41z" fill="url(#playBlue)" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-800 leading-tight">Google Play</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-600">Store</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Lite</span>
                </div>
              </div>
            </div>
          </a>
        </div>
        
        {/* More Options */}
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-100"
        >
          <MoreVertical className="h-6 w-6 text-gray-700" />
        </Button>
      </div>
    </header>
  );
}
