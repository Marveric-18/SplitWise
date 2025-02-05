import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./context";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authToken = context.headers["x-access-token"]
  const AUTH_SECRET = process.env.AUTH_SECRET || "marvensiser";

  if (!authToken) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = verify(authToken, AUTH_SECRET);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};
