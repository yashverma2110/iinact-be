import { RequestHandler } from "express";
import List from "../models/List";

const createList: RequestHandler = async (req, res) => {
  try {
    const list = new List({ ...req.body, user: req.user._id });

    await list.save();

    res.status(201).json({
      success: true,
      list,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        msg: error.code,
        meta: error,
      },
    });
  }
};

const getListsByUser: RequestHandler = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      lists,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        msg: error.message ?? error.code,
        meta: error,
      },
    });
  }
};

export default { createList, getListsByUser };
