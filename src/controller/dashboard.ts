import * as express from "express";
const dashboardRouter = express.Router();
import mongodbDashboardCollectionts from "../mongodb/mongodbDashboardCollectionts";
import axios, { AxiosResponse } from "axios";
import { DashboardItemType } from "../types/interfaces";
import { Cups } from "../utilis/consts";

async function get(req: express.Request, res: express.Response, next: express.NextFunction) {
  const userId: any = req.user;

  try {
    const data = await mongodbDashboardCollectionts.getDocumnetByUserId(userId);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function add(req: express.Request, res: express.Response, next: express.NextFunction) {
  const userId: any = req.user;
  const { item }: any = req.body;
  try {
    await mongodbDashboardCollectionts.addItem(userId, item);
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ err });
  }
}

const _add_isReqValid = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { item }: any = req.body;
  if (item) {
    const { city, size } = item;
    if (typeof city === "string" && Object.keys(Cups).includes(size)) next();
  }

  res.status(400).json({ err: new Error("Invalid Request") });
};

const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const response: AxiosResponse = await axios.post("http://localhost:3002/v1/auth/", req.body, { headers: req.headers });
  req.user = response.data.user;
  next();
};

dashboardRouter.post("/add", authenticate, _add_isReqValid, add);

export { dashboardRouter };
