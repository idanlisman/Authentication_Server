import { Document } from 'mongodb';
import { MongodbClient } from './mongoClient';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';

class MongodbAuthCollection extends MongodbClient {
    constructor() {
        super(process.env.MONGO_DB_NAME, process.env.MONGO_DB_AUTH_COLLECTION_NAME)
        this.connect();
    }

    async setNewUser(username: string, password: string): Promise<Document> {
        const isUserExist = await this._getDocumnetByUser(username);
        if (!isUserExist) {
            const encryptedPassword: string = await hash(password, 10);
            return this._setDocument({ username, password: encryptedPassword });
        }
    }

    async validateUser(username: string, password: string): Promise<string> {
        const userData = await this._getDocumnetByUser(username);
        if (userData) {
            const isPasswordCorrect = await compare(password, userData.password);
            if (isPasswordCorrect) {
                return this.updateTokenKey(username);
            }
        }
    }

    private async updateTokenKey(username: string): Promise<string> {
        const key = uuid();
        await this._updateDocumentUserKey(username, key);
        return key;
    }
}

export { MongodbAuthCollection }