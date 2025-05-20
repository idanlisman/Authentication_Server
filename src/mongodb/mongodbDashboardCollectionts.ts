import { Document } from "mongodb";
import MongodbClient from "./mongoClient";
import { DashboardItemType } from "../types/interfaces";

class MongodbDashboardCollection extends MongodbClient {
  constructor() {
    super(process.env.MONGO_DB_NAME, process.env.MONGO_DB_DASHBOARD_COLLECTION_NAME);
    this.connect();
  }

  async getDocumnetByUserId(userId: string): Promise<Document> {
    return this._getDocumnetByUserId(userId);
  }

  async addItem(userId: string, item: DashboardItemType): Promise<Document> {
    return this._updateDocumentByUserId(userId, item);
  }
}

// Export as Singleton
export default new MongodbDashboardCollection();
