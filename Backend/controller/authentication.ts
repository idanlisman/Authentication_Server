import * as express from 'express';
const authRouter = express.Router();
import { MongodbAuthCollection } from '../mongodb/mongodbAuthCollection';
const mongodbAuthCollection = new MongodbAuthCollection();

import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

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

async function users(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { token } = req.cookies;
    const { username } = req.params;
    let tokenValue: any;
    let password: string;

    try {
        const userData = await mongodbAuthCollection._getDocumnetByUser(username);
        password = userData.password;
        tokenValue = verify(token, userData.key);
    } catch (err) {
        res.status(500).json({});
        return err
    }

    const isPasswordCorrect = await compare(tokenValue.password, password);
    if (isPasswordCorrect) {
        res.status(200).json({ password })
    } else {
        res.status(500).json({});
    }
}

authRouter.post('/login', signIn);
authRouter.post('/signup', signUp);
authRouter.post('/validate', validate);
authRouter.get('/users/:username', users);

export { authRouter };