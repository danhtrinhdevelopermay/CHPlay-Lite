import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DeveloperApp } from "@shared/schema";

interface DeveloperAppsProps {
  apps: DeveloperApp[];
  developer: string;
}

export default function DeveloperApps({ apps, developer }: DeveloperAppsProps) {
  if (!apps.length) return null;

  return (
    <Card className="mt-12 shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Ứng dụng khác từ {developer}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => window.open(`https://play.google.com/store/apps/details?id=${app.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}`, '_blank')}
            >
              <img
                src={app.icon}
                alt={`${app.name} App Icon`}
                className="w-12 h-12 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{app.name}</div>
                <div className="text-xs text-play-light-gray">{app.category}</div>
                <div className="flex items-center text-xs">
                  <span className="mr-1">{app.rating}</span>
                  <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
