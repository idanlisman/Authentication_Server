import * as express from 'express';
const authRouter = express.Router();
import { MongodbAuthCollection } from '../mongodb/mongodbAuthCollection';
const mongodbAuthCollection = new MongodbAuthCollection();

import { sign } from 'jsonwebtoken';

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;
    try {
        const key = await mongodbAuthCollection.validateUser(username, password);
        if (key) {
            const token = sign({ password }, `${key}`);
            res.status(200).json({ token });
        } else {
            res.status(403).json({});
        }
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, password } = req.body;
    try {
        const result = await mongodbAuthCollection.setNewUser(username, password);
        if (result) {
            res.status(200).json({});
        } else {
            res.status(400).json({});
        }
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function validate(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username } = req.body;    
    try {
        const result = await mongodbAuthCollection._getDocumnetByUser(username);        
        if (!result && username !== '') {
            res.status(200).json({});
        } else {            
            res.status(400).json({});
        }
    } catch (err) {
        res.status(500).json({});
    }
}

authRouter.post('/login', signIn);
authRouter.post('/signup', signUp);
authRouter.post('/validate', validate);

export { authRouter };