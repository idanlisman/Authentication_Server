import cors from "cors";
import express from "express";
import passport from "passport";

const app = express();
const port = +process.env.PORT || 3002;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*", credentials: true }));
app.use(passport.initialize());

import dotenv from "dotenv";
dotenv.config();

import { authRouter } from "./src/controller/authentication";
app.use("/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
