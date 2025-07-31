import { type App, type InsertApp, type Review, type InsertReview, type DeveloperApp, type InsertDeveloperApp, type SimilarApp, type InsertSimilarApp } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getApp(id: string): Promise<App | undefined>;
  getAppByName(name: string): Promise<App | undefined>;
  createApp(app: InsertApp): Promise<App>;
  getReviewsByAppId(appId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getDeveloperApps(developer: string): Promise<DeveloperApp[]>;
  getSimilarApps(): Promise<SimilarApp[]>;
  getAllApps(): Promise<App[]>;
}

export class MemStorage implements IStorage {
  private apps: Map<string, App>;
  private reviews: Map<string, Review>;
  private developerApps: Map<string, DeveloperApp>;
  private similarApps: Map<string, SimilarApp>;

  constructor() {
    this.apps = new Map();
    this.reviews = new Map();
    this.developerApps = new Map();
    this.similarApps = new Map();
    
    // Initialize with AirDroid app data
    this.initializeData();
  }

  private initializeData() {
    // Main app
    const airDroidApp: App = {
      id: "airdroid-1",
      name: "Twink AI - Chỉnh sửa ảnh với AI tiên tiến",
      developer: "BRIGHT STARTS ACADEMY BSA",
      category: "Nhiếp ảnh",
      icon: "client/appstore.png",
      rating: "4.6",
      totalReviews: 24800,
      downloads: "5M+",
      contentRating: "4+",
      description: "🎨 Twink AI - Trải nghiệm chỉnh sửa ảnh hoàn toàn mới với sức mạnh của trí tuệ nhân tạo!\n\n✨ TÍNH NĂNG NỔI BẬT:\n🔹 Xóa nền thông minh - Tách nền hoàn hảo chỉ với 1 chạm\n🔹 Xóa vật thể không mong muốn - Loại bỏ người lạ, vật cản một cách tự nhiên\n🔹 Xóa văn bản và logo - Làm sạch ảnh khỏi các yếu tố không cần thiết\n🔹 Nâng cấp độ phân giải - Tăng chất lượng ảnh lên 4K siêu nét\n🔹 Mở rộng ảnh AI - Tạo thêm nội dung xung quanh ảnh một cách tự nhiên\n🔹 Tái tạo ảnh thông minh - Phục hồi ảnh cũ, mờ thành tác phẩm hoàn hảo\n🔹 Thay đổi nền sáng tạo - Hàng nghìn background chuyên nghiệp\n🔹 Tạo ảnh sản phẩm - Chụp ảnh bán hàng chuyên nghiệp tại nhà\n🔹 Text-to-Image - Biến ý tưởng thành hình ảnh chỉ bằng lời mô tả\n\n🚀 Được tin dùng bởi hàng triệu người dùng toàn cầu. Twink AI giúp bạn tạo ra những bức ảnh đẹp như chuyên gia chỉ trong vài giây!",
      lastUpdated: "31 thg 7, 2025",
      version: "2.1.4",
      screenshots: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&w=200&h=356&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&w=200&h=356&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&w=200&h=356&fit=crop",
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&w=200&h=356&fit=crop",
        "https://images.unsplash.com/photo-1574192324001-ee41e18ed679?ixlib=rb-4.0.3&w=200&h=356&fit=crop"
      ],
      createdAt: new Date()
    };
    this.apps.set(airDroidApp.id, airDroidApp);

    // Reviews
    const reviewsData: Review[] = [
      {
        id: randomUUID(),
        appId: "airdroid-1",
        userName: "Mai Nguyen",
        userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c7?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 5,
        content: "Xuất sắc! Tính năng xóa nền AI rất chính xác, chỉ 1 click là có ảnh chuyên nghiệp. Đặc biệt thích tính năng tạo ảnh từ văn bản, quá tuyệt vời!",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        appId: "airdroid-1",
        userName: "Duc Tran",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 5,
        content: "Làm ảnh sản phẩm cho shop online của tôi trở nên dễ dàng hơn rất nhiều. AI nâng độ phân giải siêu nét, khách hàng khen không ngớt!",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        appId: "airdroid-1",
        userName: "Hương Lê",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 4,
        content: "Ứng dụng rất mạnh, xóa vật thể không mong muốn rất tự nhiên. Mình thường dùng để xóa người lạ khỏi ảnh du lịch, kết quả như magic!",
        createdAt: new Date()
      }
    ];
    
    reviewsData.forEach(review => this.reviews.set(review.id, review));

    // Developer apps - chỉ hiển thị Twink AI
    const devApps: DeveloperApp[] = [
      {
        id: randomUUID(),
        name: "Twink AI - Chỉnh sửa ảnh",
        developer: "BRIGHT STARTS ACADEMY BSA",
        category: "Nhiếp ảnh",
        icon: "/appstore.png",
        rating: "4.8"
      }
    ];
    
    devApps.forEach(app => this.developerApps.set(app.id, app));

    // Similar apps - ứng dụng chỉnh sửa ảnh và AI thực tế từ CH Play
    const simApps: SimilarApp[] = [
      {
        id: randomUUID(),
        name: "Snapseed",
        developer: "Google LLC",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.0"
      },
      {
        id: randomUUID(),
        name: "Adobe Lightroom",
        developer: "Adobe",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      },
      {
        id: randomUUID(),
        name: "Photoshop Express",
        developer: "Adobe",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1558618047-0c4e95cefe72?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      },
      {
        id: randomUUID(),
        name: "PicsArt Photo Editor",
        developer: "PicsArt, Inc.",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.1"
      },
      {
        id: randomUUID(),
        name: "Remini - AI Photo Enhancer",
        developer: "Bending Spoons",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.2"
      },
      {
        id: randomUUID(),
        name: "VSCO Photo Editor",
        developer: "VSCO",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.3"
      },
      {
        id: randomUUID(),
        name: "Canva: Design & Photo",
        developer: "Canva",
        category: "Nghệ thuật & Thiết kế",
        icon: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.7"
      },
      {
        id: randomUUID(),
        name: "InShot Video Editor",
        developer: "InShot Inc.",
        category: "Video",
        icon: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      }
    ];
    
    simApps.forEach(app => this.similarApps.set(app.id, app));
  }

  async getApp(id: string): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async getAppByName(name: string): Promise<App | undefined> {
    return Array.from(this.apps.values()).find(app => app.name === name);
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = randomUUID();
    const app: App = { ...insertApp, id, createdAt: new Date() };
    this.apps.set(id, app);
    return app;
  }

  async getReviewsByAppId(appId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.appId === appId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    return review;
  }

  async getDeveloperApps(developer: string): Promise<DeveloperApp[]> {
    return Array.from(this.developerApps.values()).filter(app => app.developer === developer);
  }

  async getSimilarApps(): Promise<SimilarApp[]> {
    return Array.from(this.similarApps.values());
  }

  async getAllApps(): Promise<App[]> {
    return Array.from(this.apps.values());
  }
}

export const storage = new MemStorage();