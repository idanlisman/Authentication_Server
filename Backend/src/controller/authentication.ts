import * as express from "express";
const authRouter = express.Router();
import mongodbAuthCollection from "../mongodb/mongodbAuthCollection";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { getUserIdFromToken } from "../utilis/utils";
import passport from "passport";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: async (req: Request, token: string, done: (err: Error | null, secret: string | null) => void): Promise<void> => {
    const userId: string = getUserIdFromToken(token);
    const secret: string = await mongodbAuthCollection.getSecretByUserId(userId);
    if (!secret) return done(new Error("Invalid client or secret not found"), null);
    return done(null, secret);
  },
};

passport.use(
  new Strategy(opts, (jwtPayload, done) => {
    if (jwtPayload) return done(null, jwtPayload.id);
    else return done(null, false);
  })
);

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { username, password } = req.body;
  try {
    const token: string = await mongodbAuthCollection.authenticateUser(username, password);
    if (token) res.status(200).json({ token });
    else res.status(403).json({});
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { username, password } = req.body;
  try {
    const token: string = await mongodbAuthCollection.setUser(username, password);
    if (token) res.status(200).json({ token });
    else res.status(400).json({});
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function isUsernameValid(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { username } = req.body;
  try {
    const isValid: boolean = await mongodbAuthCollection.isUsernameValid(username);
    if (isValid) res.status(200).json({});
    else res.status(400).json({});
  } catch (err) {
    res.status(500).json({});
  }
}

async function test(req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = req.user;
  console.log(user);

  res.status(200).json({});
}

authRouter.post("/login", signIn);
authRouter.post("/signup", signUp);
authRouter.post("/validate", isUsernameValid);
authRouter.get("/test", passport.authenticate("jwt", { session: false }), test);

export { authRouter };
