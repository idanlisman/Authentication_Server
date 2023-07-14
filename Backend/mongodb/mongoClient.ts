import { MongoClient, Collection, Document } from 'mongodb';

const MONGO_DB_URL = 'mongodb://localhost';

class MongodbClient {
    private readonly client: MongoClient;
    private readonly dbName: string;
    private readonly collectionName: string;
    collection: Collection;

    constructor(dbName: string, collectionName: string) {
        this.client = new MongoClient(MONGO_DB_URL);
        this.dbName = dbName;
        this.collectionName = collectionName;
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.collection = this.client.db(this.dbName).collection(this.collectionName);
        } catch (err) {
            console.error(err);
            throw err
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.close();
        } catch (err) {
            console.error(err);
            throw err
        }
    }

    async _getDocumnetByUser(username: string): Promise<Document> {        
        try {
            return await this.collection.findOne({ username });
        } catch (err) {
            console.error({ err });
            throw err;

        }
    }

    async _setDocument(document: Document): Promise<Document> {
        try {
            return await this.collection.insertOne(document);
        } catch (err) {
            console.error({ err });
            throw err;

        }
    }

    async _updateDocumentUserKey(username: string, key: string): Promise<Document> {
        try {
            return await this.collection.updateOne({ username }, { $set: { key } });
        } catch (err) {
            console.error({ err });
            throw err;

        }
    }
}

export { MongodbClient }