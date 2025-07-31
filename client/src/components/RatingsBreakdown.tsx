import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { App } from "@shared/schema";

interface RatingsBreakdownProps {
  app: App;
}

export default function RatingsBreakdown({ app }: RatingsBreakdownProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 68 },
    { stars: 4, percentage: 22 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-orange-400 text-orange-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Xếp hạng và đánh giá</h2>
        
        {/* Average Rating */}
        <div className="text-center mb-6">
          <div className="text-4xl font-light text-gray-900 mb-2">{app.rating}</div>
          <div className="flex justify-center mb-2">
            {renderStars(parseFloat(app.rating))}
          </div>
          <div className="text-sm text-play-light-gray">{app.totalReviews.toLocaleString()} đánh giá</div>
        </div>
        
        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2 text-sm">
              <span className="w-2">{item.stars}</span>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-xs text-play-light-gray w-8">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
