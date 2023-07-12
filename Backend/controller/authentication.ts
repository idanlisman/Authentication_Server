import * as express from 'express';
const authRouter = express.Router();
import { MongodbAuthCollection } from '../mongodb/mongodbAuthCollection';
const mongodbAuthCollection = new MongodbAuthCollection();

import { sign } from 'jsonwebtoken';

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;
    const isUserValid = await mongodbAuthCollection.validateUser(username, password);
    if (isUserValid) {
        const token = sign({ username }, `${username}:${password}`, {  });
        res.status(200).json({ token });
    } else {
        res.status(403).json({});
    }
}

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;
    await mongodbAuthCollection.setNewUser(username, password);
    res.status(200).json({});
}

authRouter.post('/login', signIn);
authRouter.post('/signup', signUp);

export { authRouter };