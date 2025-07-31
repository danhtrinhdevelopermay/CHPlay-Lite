import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ReviewFormProps {
  appId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ appId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      userName: string;
      rating: number;
      content: string;
    }) => {
      const response = await apiRequest("POST", `/api/apps/${appId}/reviews`, reviewData);
      return response.json();
    },
    onSuccess: () => {
      // Force refetch reviews immediately
      queryClient.refetchQueries({ queryKey: ["/api/apps", appId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/apps/by-name"] });
      
      toast({
        title: "Thành công!",
        description: "Đánh giá của bạn đã được gửi.",
      });
      
      // Reset form
      setRating(0);
      setUserName("");
      setContent("");
      setIsOpen(false);
      
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể gửi đánh giá. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !content.trim() || rating === 0) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin và chọn số sao.",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate({
      userName: userName.trim(),
      rating,
      content: content.trim(),
    });
  };

  if (!isOpen) {
    return (
      <div className="mt-4">
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-[#01875f] hover:bg-[#016147] text-white"
        >
          Viết đánh giá
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Đánh giá (bắt buộc)
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tên của bạn (bắt buộc)
          </label>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nhập tên của bạn"
            maxLength={50}
          />
        </div>

        {/* Review Content */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Nội dung đánh giá (bắt buộc)
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn về ứng dụng này..."
            rows={4}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1">
            {content.length}/500 ký tự
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="bg-[#01875f] hover:bg-[#016147] text-white"
          >
            {createReviewMutation.isPending ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              setRating(0);
              setUserName("");
              setContent("");
            }}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}