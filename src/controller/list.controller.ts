import { RequestHandler } from "express";
import List from "../models/List";

const createList: RequestHandler = async (req, res) => {
  try {
    const list = new List(req.body);

    await list.save();

    res.status(201).json({
      success: true,
      list,
    });
  } catch (error: any) {
    res.json({
      success: false,
      error: {
        msg: error.code,
      },
    });
  }
};

export default { createList };
