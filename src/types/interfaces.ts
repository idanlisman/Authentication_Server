import { Cups } from "../utilis/consts";

export interface UserDashboardDataType {
  city?: string;
  type?: string;
  size?: string;
}

export interface DashboardItemType {
  city: string;
  size: keyof Cups;
}