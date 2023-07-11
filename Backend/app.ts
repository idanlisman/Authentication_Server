import * as cors from 'cors';
import * as express from 'express';
const app = express();
const port = +process.env.PORT || 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

import { authRouter } from './controller/authentication';
app.use('/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});