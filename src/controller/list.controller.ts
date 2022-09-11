import { RequestHandler } from "express";
import List from "../models/List";

const getListsByUser: RequestHandler = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id });

    res.status(200).json({
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

const createList: RequestHandler = async (req, res) => {
  try {
    const list = new List({ ...req.body, user: req.user._id });

    await list.save();

    res.status(201).json({
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

const editList: RequestHandler = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
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

export default { createList, getListsByUser, editList };
