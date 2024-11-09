import { JwtPayload, sign, verify, decode } from "jsonwebtoken";

export const getToken = (id: string, key: string): string => sign({ id }, key);
export const verifyToken = (token: string, key: string): string | JwtPayload => verify(token, key);
export const getUserIdFromToken = (token: string): string => {
  const res: any = decode(token);  
  if (res) return res.id;
};