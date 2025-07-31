import { Card, CardContent } from "@/components/ui/card";

export default function WhatsNew() {
  const updates = [
    "Sửa lỗi và cải thiện hiệu suất",
    "Tối ưu hóa tính năng truyền file",
    "Cải thiện giao diện người dùng"
  ];

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tính năng mới</h2>
        <div className="text-sm text-gray-700">
          {updates.map((update, index) => (
            <p key={index} className="mb-2">• {update}</p>
          ))}
          <p className="text-play-light-gray text-xs mt-4">
            Phiên bản 4.2.8.6 • 28 thg 7, 2025
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
