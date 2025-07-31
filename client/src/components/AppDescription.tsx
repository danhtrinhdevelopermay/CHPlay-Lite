import { Card, CardContent } from "@/components/ui/card";
import type { App } from "@shared/schema";

interface AppDescriptionProps {
  app: App;
}

export default function AppDescription({ app }: AppDescriptionProps) {
  const formatDescription = (description: string) => {
    return description.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <li key={index} className="ml-4">
            {line.substring(1).trim()}
          </li>
        );
      }
      return line ? <p key={index} className="mb-4">{line}</p> : null;
    });
  };

  return (
    <Card className="shadow-play">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin về ứng dụng này</h2>
        <div className="prose max-w-none text-gray-700">
          {formatDescription(app.description)}
          <p className="text-sm text-play-light-gray mt-6">
            Cập nhật gần nhất: {app.lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
