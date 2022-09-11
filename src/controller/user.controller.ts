import { RequestHandler } from "express";
import UTILS from "../utils/helpers/auth";
import User from "../models/User";
import Tag from "../models/Tag";

const signUp: RequestHandler = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    const token = await UTILS.generateAuthToken(req.body.email, user._id);

    return res.status(201).json({
      success: true,
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    });
  } catch (e: any) {
    console.log(e);
    res.status(e.code === "ER_DUP_ENTRY" ? 409 : 400).send({
      success: false,
      error: {
        msg: e.message,
      },
    });
  }
};

const logIn: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user?.email || !user.id) {
      return res.status(404).json({
        success: false,
        error: {
          msg: "USER_NOT_FOUND",
        },
      });
    }

    const token = await UTILS.generateAuthToken(user.email, user._id);
    res.json({
      token,
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      error: {
        msg: e,
      },
    });
  }
};

const getUser: RequestHandler = async (req, res) => {
  try {
    const { _id, email, firstName, lastName } = req.user;

    const tags = await Tag.find({ user: _id });

    res.json({
      _id,
      email,
      firstName,
      lastName,
      tags,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: {
        msg: error.code,
      },
    });
  }
};

const addTagForUser: RequestHandler = async (req, res) => {
  try {
    const existingTag = await Tag.findOne({
      name: req.body.name,
    });

    if (existingTag?.name) {
      return res.status(409).json({
        success: false,
        error: {
          msg: "TAG_ALREADY_EXISTS",
        },
      });
    }

    const tag = new Tag({ ...req.body, user: req.user._id });

    await tag.save();

    return res.status(201).json({
      success: true,
      tag,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        msg: error.code,
        error,
      },
    });
  }
};

export default {
  signUp,
  logIn,
  getUser,
  addTagForUser,
};
