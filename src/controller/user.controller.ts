import { RequestHandler } from "express";
import UTILS from "../utils/helpers/auth";
import User from "../models/User";

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
      success: true,
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

    res.json({
      _id,
      email,
      firstName,
      lastName,
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

export default {
  signUp,
  logIn,
  getUser,
};
