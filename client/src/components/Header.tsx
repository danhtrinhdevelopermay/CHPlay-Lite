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
        
        {/* Title - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:flex items-center space-x-2">
          <a 
            href="https://play.google.com/store" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {/* Logo - You can replace this with an image */}
            <img 
              src="/appstore.png" 
              alt="App Store Logo" 
              className="w-6 h-6 rounded-sm"
              onError={(e) => {
                // Fallback to CSS logo if image fails to load
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const nextEl = target.nextElementSibling as HTMLElement;
                if (nextEl) {
                  nextEl.style.display = 'flex';
                }
              }}
            />
            <div className="w-6 h-6 bg-play-green rounded-sm items-center justify-center hidden">
              <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-medium play-gray">App Store</span>
            <span className="text-xs bg-play-green text-white px-2 py-1 rounded-full ml-2">Lite</span>
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
