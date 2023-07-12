import { InsertOneResult } from 'mongodb';
import { MongodbClient } from './mongoClient';
import { hash, compare } from 'bcrypt';

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

    async validateUser(username: string, password: string) {
        const isUserExist = await this.collection.findOne({ username });
        if (isUserExist) {
            const isPasswordCorrect = await compare(password, isUserExist.password);
            if (isPasswordCorrect) {
                return true;
            }
        }

        return false;
    }
}

export { MongodbAuthCollection }