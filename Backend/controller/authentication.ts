import * as express from 'express';
const authRouter = express.Router();
import { MongodbAuthCollection } from '../mongodb/mongodbAuthCollection';
const mongodbAuthCollection = new MongodbAuthCollection();

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;
    await mongodbAuthCollection.setNewUser(username, password);
    res.status(200).json({});
}

authRouter.post('/signup', signUp);

export { authRouter };