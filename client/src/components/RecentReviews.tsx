import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@shared/schema";

interface RecentReviewsProps {
  reviews: Review[];
}

export default function RecentReviews({ reviews }: RecentReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating 
            ? 'fill-orange-400 text-orange-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!reviews.length) return null;

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <h3 className="font-medium text-gray-900 mb-4">Đánh giá gần đây</h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.userAvatar}
                  alt={`${review.userName} Avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-sm">{review.userName}</div>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
