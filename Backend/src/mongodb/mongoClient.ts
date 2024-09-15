import { MongoClient, Collection, Document } from "mongodb";

class MongodbClient {
  private readonly client: MongoClient;
  private readonly dbName: string;
  private readonly collectionName: string;
  collection: Collection;

  constructor(dbName: string, collectionName: string) {
    this.client = new MongoClient(process.env.MONGO_DB_URL);
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  protected async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.collection = this.client.db(this.dbName).collection(this.collectionName);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  protected async disconnect(): Promise<void> {
    try {
      await this.client.close();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  protected async _getDocumnetByUsername(username: string): Promise<Document> {
    try {
      return await this.collection.findOne({ username });
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  protected async _getDocumnetByUserId(userId: string): Promise<Document> {
    try {
      return await this.collection.findOne({ userId });
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  protected async _setDocument(document: Document): Promise<Document> {
    try {
      return await this.collection.insertOne(document);
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }
}

export default MongodbClient;
