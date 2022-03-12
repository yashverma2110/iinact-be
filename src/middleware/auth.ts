import jwt from "jsonwebtoken";
import endpoints from "../utils/config/endpoints.config";
import User from "../models/User";
import { RequestHandler } from "express";

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";
    const decoded: any = jwt.verify(token, endpoints.JWT_ACCESS_TOKEN);

    const user = await User.findOne({
      _id: decoded.id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default {
  checkAuth: auth,
};
