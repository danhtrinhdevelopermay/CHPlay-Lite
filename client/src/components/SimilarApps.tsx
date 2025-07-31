import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SimilarApp } from "@shared/schema";

interface SimilarAppsProps {
  apps: SimilarApp[];
}

export default function SimilarApps({ apps }: SimilarAppsProps) {
  if (!apps.length) return null;

  return (
    <Card className="mt-8 shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Ứng dụng tương tự</h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {apps.map((app) => {
              // Map app names to their actual Google Play Store package IDs
              const packageIds: Record<string, string> = {
                "TeamViewer Remote Control": "com.teamviewer.teamviewer.market.mobile",
                "Chrome Remote Desktop": "com.google.chromeremotedesktop", 
                "RealVNC Viewer": "com.realvnc.viewer.android",
                "Windows App": "com.microsoft.rdc.androidx"
              };
              
              const packageId = packageIds[app.name] || app.name.toLowerCase().replace(/[^a-z0-9]/g, '.');
              
              return (
                <div
                  key={app.id}
                  className="w-48 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-play-hover transition-shadow cursor-pointer flex-shrink-0"
                  onClick={() => window.open(`https://play.google.com/store/apps/details?id=${packageId}`, '_blank')}
                >
                  <img
                    src={app.icon}
                    alt={`${app.name} App Icon`}
                    className="w-16 h-16 rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm mb-1 truncate">{app.name}</h3>
                  <div className="text-xs text-play-light-gray mb-2">{app.developer}</div>
                  <div className="flex items-center text-xs mb-2">
                    <span className="mr-1">{app.rating}</span>
                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                  </div>
                  <div className="text-xs text-play-light-gray">{app.category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
