import * as cors from 'cors';
import * as express from 'express';
import * as cookies from 'cookie-parser';

const app = express();
const port = +process.env.PORT || 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookies());

import { authRouter } from './controller/authentication';
app.use('/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});