import { Shield, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DataSafety() {
  const safetyFeatures = [
    "Không chia sẻ dữ liệu",
    "Mã hóa khi truyền",
    "Yêu cầu xóa dữ liệu"
  ];

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">An toàn dữ liệu</h2>
        <div className="flex items-start gap-4 mb-4">
          <Shield className="w-8 h-8 text-play-green mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quyền riêng tư và bảo mật</h3>
            <p className="text-sm text-gray-700 mb-4">
              Nhà phát triển cam kết không thu thập hoặc chia sẻ dữ liệu người dùng với bên thứ ba. 
              Ứng dụng sử dụng mã hóa end-to-end để bảo vệ thông tin cá nhân.
            </p>
            <div className="flex flex-wrap gap-2">
              {safetyFeatures.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
