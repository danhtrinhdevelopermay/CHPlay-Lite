import { Star } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReviewForm } from "@/components/ReviewForm";
import type { Review } from "@shared/schema";

interface RecentReviewsProps {
  reviews: Review[];
  appId: string;
}

export default function RecentReviews({ reviews, appId }: RecentReviewsProps) {
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

  if (!reviews.length) {
    return (
      <Card className="shadow-play">
        <CardContent className="p-6">
          <h3 className="font-medium text-gray-900 mb-4">Đánh giá gần đây</h3>
          <p className="text-gray-500 text-sm mb-4">Chưa có đánh giá nào.</p>
          {/* Review Form */}
          <ReviewForm appId={appId} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Đánh giá gần đây</h3>
          {reviews.length > 3 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[#01875f] text-sm hover:underline">
                  Xem tất cả đánh giá ({reviews.length})
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Tất cả đánh giá ({reviews.length})</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">{review.userName}</div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review) => (
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
        
        {/* Review Form */}
        <ReviewForm appId={appId} />
      </CardContent>
    </Card>
  );

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Đánh giá gần đây</h3>
          {reviews.length > 3 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[#01875f] text-sm hover:underline">
                  Xem tất cả đánh giá ({reviews.length})
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Tất cả đánh giá ({reviews.length})</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">{review.userName}</div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="space-y-4">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-sm text-gray-900">{review.userName}</div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 ml-11">{review.content}</p>
            </div>
          ))}
        </div>
        
        {/* Review Form */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <ReviewForm appId={appId} />
        </div>
      </CardContent>
    </Card>
  );
}
