import { Document } from "mongodb";
import MongodbClient from "./mongoClient";
import { hash, compare } from "bcrypt";
import { v4 as uuid } from "uuid";
import { getToken } from "../utilis/utils";

class MongodbAuthCollection extends MongodbClient {
  constructor() {
    super(process.env.MONGO_DB_NAME, process.env.MONGO_DB_AUTH_COLLECTION_NAME);
    this.connect();
  }

  async setUser(username: string, password: string): Promise<string | null> {
    if (username === "" || username == null) return;

    const isUserExist: Document = await this._getDocumnetByUsername(username);
    if (!isUserExist) {
      const userId: string = uuid();
      const secret: string = await hash(password, 10);
      await this._setDocument({ username, password: secret, userId });
      return getToken(userId, secret);
    }
  }

  async authenticateUser(username: string, password: string): Promise<string | null> {
    const userData: Document = await this._getDocumnetByUsername(username);
    if (userData) {
      const { userId, password: secret }: Document = userData;
      const isPasswordCorrect: boolean = await compare(password, secret);
      if (isPasswordCorrect) return getToken(userId, secret);
    }
  }

  async getSecretByUserId(userId: string): Promise<string | null> {    
    const res: Document = await this._getDocumnetByUserId(userId);
    if (res) return res.password;
  }

  async isUsernameValid(username: string): Promise<boolean> {
    const isUsernameExist: boolean = !!(await this._getDocumnetByUsername(username));
    return isUsernameExist || username === "" ? false : true;
  }
}

// Export as Singleton
export default new MongodbAuthCollection();
