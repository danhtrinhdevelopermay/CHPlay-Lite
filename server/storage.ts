import { 
  type App, type InsertApp, type Review, type InsertReview, 
  type DeveloperApp, type InsertDeveloperApp, type SimilarApp, type InsertSimilarApp,
  type User, type UpsertUser,
  apps, reviews, developerApps, similarApps, users
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, avg, count } from "drizzle-orm";

export interface IStorage {
  // App operations
  getApp(id: string): Promise<App | undefined>;
  getAppByName(name: string): Promise<App | undefined>;
  createApp(app: InsertApp): Promise<App>;
  getAllApps(): Promise<App[]>;
  updateAppRating(id: string, rating: string, totalReviews: number): Promise<void>;
  
  // Review operations
  getReviewsByAppId(appId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Developer and similar apps
  getDeveloperApps(developer: string): Promise<DeveloperApp[]>;
  getSimilarApps(): Promise<SimilarApp[]>;
  
  // User operations (for authentication and reviews)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize sample data if database is empty
    this.initializeDataIfNeeded();
  }

  private async initializeDataIfNeeded() {
    try {
      // Check if data already exists
      const existingApps = await db.select().from(apps).limit(1);
      if (existingApps.length > 0) {
        return; // Data already exists
      }

      await this.initializeData();
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }

  private async initializeData() {
    // Insert main app
    await db.insert(apps).values({
      id: "airdroid-1",
      name: "Twink AI - Chỉnh sửa ảnh với AI tiên tiến",
      developer: "Danh Trình - BSA",
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
      ]
    });

    // Insert reviews
    await db.insert(reviews).values([
      {
        appId: "airdroid-1",
        userName: "Mai Nguyen",
        userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c7?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 5,
        content: "Xuất sắc! Tính năng xóa nền AI rất chính xác, chỉ 1 click là có ảnh chuyên nghiệp. Đặc biệt thích tính năng tạo ảnh từ văn bản, quá tuyệt vời!"
      },
      {
        appId: "airdroid-1",
        userName: "Duc Tran",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 5,
        content: "Làm ảnh sản phẩm cho shop online của tôi trở nên dễ dàng hơn rất nhiều. AI nâng độ phân giải siêu nét, khách hàng khen không ngớt!"
      },
      {
        appId: "airdroid-1",
        userName: "Hương Lê",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face",
        rating: 4,
        content: "Ứng dụng rất mạnh, xóa vật thể không mong muốn rất tự nhiên. Mình thường dùng để xóa người lạ khỏi ảnh du lịch, kết quả như magic!"
      }
    ]);

    // Insert developer apps - chỉ hiển thị Twink AI
    await db.insert(developerApps).values([
      {
        name: "Twink AI - Chỉnh sửa ảnh",
        developer: "BRIGHT STARTS ACADEMY BSA",
        category: "Nhiếp ảnh",
        icon: "/appstore.png",
        rating: "4.8"
      }
    ]);

    // Insert similar apps - ứng dụng chỉnh sửa ảnh và AI thực tế từ CH Play
    await db.insert(similarApps).values([
      {
        name: "Snapseed",
        developer: "Google LLC",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.0"
      },
      {
        name: "Adobe Lightroom",
        developer: "Adobe",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      },
      {
        name: "Photoshop Express",
        developer: "Adobe",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1558618047-0c4e95cefe72?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      },
      {
        name: "PicsArt Photo Editor",
        developer: "PicsArt, Inc.",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.1"
      },
      {
        name: "Remini - AI Photo Enhancer",
        developer: "Bending Spoons",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.2"
      },
      {
        name: "VSCO Photo Editor",
        developer: "VSCO",
        category: "Nhiếp ảnh",
        icon: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.3"
      },
      {
        name: "Canva: Design & Photo",
        developer: "Canva",
        category: "Nghệ thuật & Thiết kế",
        icon: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.7"
      },
      {
        name: "InShot Video Editor",
        developer: "InShot Inc.",
        category: "Video",
        icon: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&w=48&h=48&fit=crop",
        rating: "4.6"
      }
    ]);
  }

  // App operations
  async getApp(id: string): Promise<App | undefined> {
    const [app] = await db.select().from(apps).where(eq(apps.id, id));
    return app;
  }

  async getAppByName(name: string): Promise<App | undefined> {
    const [app] = await db.select().from(apps).where(eq(apps.name, name));
    return app;
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const [app] = await db.insert(apps).values(insertApp).returning();
    return app;
  }

  async getAllApps(): Promise<App[]> {
    return await db.select().from(apps);
  }

  async updateAppRating(id: string, rating: string, totalReviews: number): Promise<void> {
    await db.update(apps)
      .set({ rating, totalReviews })
      .where(eq(apps.id, id));
  }

  // Review operations
  async getReviewsByAppId(appId: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.appId, appId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    
    // Update app rating after adding new review
    await this.updateAppRatingFromReviews(insertReview.appId);
    
    return review;
  }

  private async updateAppRatingFromReviews(appId: string): Promise<void> {
    const result = await db.select({
      avgRating: avg(reviews.rating),
      totalReviews: count(reviews.id)
    }).from(reviews).where(eq(reviews.appId, appId));

    if (result[0]) {
      const newRating = Number(result[0].avgRating).toFixed(1);
      const totalReviews = result[0].totalReviews;
      await this.updateAppRating(appId, newRating, totalReviews);
    }
  }

  // Developer and similar apps
  async getDeveloperApps(developer: string): Promise<DeveloperApp[]> {
    return await db.select().from(developerApps)
      .where(eq(developerApps.developer, developer));
  }

  async getSimilarApps(): Promise<SimilarApp[]> {
    return await db.select().from(similarApps);
  }

  // User operations (for authentication and reviews)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
