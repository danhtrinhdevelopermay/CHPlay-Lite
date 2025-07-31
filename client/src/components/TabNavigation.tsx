import { useState } from "react";

const tabs = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'reviews', label: 'Đánh giá' },
  { id: 'apps', label: 'Ứng dụng' },
  { id: 'search', label: 'Tìm kiếm' }
];

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-1 font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-play-green text-play-green'
                : 'text-play-light-gray hover:text-play-gray'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
