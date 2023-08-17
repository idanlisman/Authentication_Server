import { Document } from 'mongodb';
import { MongodbClient } from './mongoClient';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';

class MongodbAuthCollection extends MongodbClient {
    constructor() {
        super(process.env.MONGO_DB_NAME, process.env.MONGO_DB_AUTH_COLLECTION_NAME)
        this.connect();
    }

    async setNewUser(username: string, password: string): Promise<Document | false> {
        const isUserExist = await this._getDocumnetByUser(username);
        if (!isUserExist) {
            const encryptedPassword: string = await hash(password, 10);
            return this._setDocument({ username, password: encryptedPassword });
        }

        return false;
    }

    async validateUser(username: string, password: string): Promise<string | false> {
        const isUserExist = await this._getDocumnetByUser(username);
        if (isUserExist) {
            const isPasswordCorrect = await compare(password, isUserExist.password);
            if (isPasswordCorrect) {
                return this.updateTokenKey(username);
            }
        }

        return false;
    }

    async updateTokenKey(username: string): Promise<string> {
        const key = uuid();
        await this._updateDocumentUserKey(username, key);
        return key;
    }
}

export { MongodbAuthCollection }