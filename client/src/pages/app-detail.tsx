import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/Header";
import AppInfo from "@/components/AppInfo";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import TabNavigation from "@/components/TabNavigation";
import AppDescription from "@/components/AppDescription";
import DataSafety from "@/components/DataSafety";
import WhatsNew from "@/components/WhatsNew";
import RatingsBreakdown from "@/components/RatingsBreakdown";
import RecentReviews from "@/components/RecentReviews";
import DeveloperApps from "@/components/DeveloperApps";
import SimilarApps from "@/components/SimilarApps";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { App, Review, DeveloperApp, SimilarApp } from "@shared/schema";

export default function AppDetail() {
  const params = useParams();
  const appName = params.appName || "Twink AI - Chỉnh sửa ảnh với AI tiên tiến";

  const { data: app, isLoading } = useQuery<App>({
    queryKey: ["/api/apps/by-name", encodeURIComponent(appName)],
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/apps", app?.id, "reviews"],
    enabled: !!app?.id,
  });

  const { data: developerApps } = useQuery<DeveloperApp[]>({
    queryKey: ["/api/developer", encodeURIComponent(app?.developer || ""), "apps"],
    enabled: !!app?.developer,
  });

  const { data: similarApps } = useQuery<SimilarApp[]>({
    queryKey: ["/api/similar-apps"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">App not found</h1>
            <p className="text-gray-600">The requested app could not be found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <main className="max-w-4xl mx-auto">
        <AppInfo app={app} />
        <div className="px-4">
          <ScreenshotCarousel screenshots={app.screenshots} />
          <TabNavigation />
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AppDescription app={app} />
              <DataSafety />
              <WhatsNew />
            </div>
            
            <div className="space-y-8">
              <RatingsBreakdown app={app} />
              <RecentReviews reviews={reviews || []} />
            </div>
          </div>
          
          {developerApps && developerApps.length > 0 && (
            <DeveloperApps apps={developerApps} developer={app.developer} />
          )}
          
          {similarApps && similarApps.length > 0 && (
            <SimilarApps apps={similarApps} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
