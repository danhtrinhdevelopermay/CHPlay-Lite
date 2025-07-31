export default function Footer() {
  const footerSections = [
    {
      title: "Google Play",
      links: [
        { name: "Ứng dụng", url: "https://play.google.com/store/apps" },
        { name: "Trò chơi", url: "https://play.google.com/store/games" },
        { name: "Sách", url: "https://play.google.com/store/books" },
        { name: "Phim & TV", url: "https://play.google.com/store/movies" }
      ]
    },
    {
      title: "Trẻ em & gia đình",
      links: [
        { name: "Hướng dẫn cho cha mẹ", url: "https://support.google.com/googleplay/answer/1075738" },
        { name: "Chia sẻ gia đình", url: "https://support.google.com/googleplay/answer/7007852" },
        { name: "Kiểm soát của cha mẹ", url: "https://support.google.com/googleplay/answer/1075738" }
      ]
    },
    {
      title: "Nhà phát triển",
      links: [
        { name: "Android Studio", url: "https://developer.android.com/studio" },
        { name: "Console Play", url: "https://play.google.com/console" },
        { name: "Chính sách nhà phát triển", url: "https://play.google.com/about/developer-content-policy/" }
      ]
    },
    {
      title: "Google Store",
      links: [
        { name: "Thiết bị", url: "https://store.google.com/category/phones" },
        { name: "Phụ kiện", url: "https://store.google.com/category/accessories" }
      ]
    },
    {
      title: "Chính sách",
      links: [
        { name: "Quyền riêng tư", url: "https://policies.google.com/privacy" },
        { name: "Điều khoản dịch vụ", url: "https://play.google.com/about/play-terms/" },
        { name: "Giới thiệu Google Play", url: "https://play.google.com/about/" }
      ]
    },
    {
      title: "Liên hệ",
      links: [
        { name: "Hỗ trợ", url: "https://support.google.com/googleplay" },
        { name: "Trung tâm trợ giúp", url: "https://support.google.com/googleplay" }
      ]
    }
  ];

  return (
    <footer className="bg-play-bg mt-16 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-play-light-gray hover:text-play-gray transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-play-light-gray">
          <p>&copy; 2025 Google LLC. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}