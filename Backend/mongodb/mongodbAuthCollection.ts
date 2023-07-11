import { InsertOneResult } from 'mongodb';
import { MongodbClient } from './mongoClient';
import { hash } from 'bcrypt';

const MONGO_DB_NAME = 'TestDatabase';
const MONGO_DB_AUTH_COLLECTION_NAME = 'Authentication';

class MongodbAuthCollection extends MongodbClient {
    constructor() {
        super(MONGO_DB_NAME, MONGO_DB_AUTH_COLLECTION_NAME)
        this.connect();
    }

    async setNewUser(username: string, password: string): Promise<InsertOneResult> {
        const encryptedPassword: string = await hash(password, 10);
        try {
            return await this.collection.insertOne({ username, password: encryptedPassword });
        } catch (err) {
            console.error({ err });
            throw err

        }
    }
}

export { MongodbAuthCollection }