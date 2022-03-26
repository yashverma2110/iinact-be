import { RequestHandler } from "express";
import Schedule from "../models/Schedule";

const createSchedule: RequestHandler = async (req, res) => {
  try {
    const schedule = new Schedule({ ...req.body, user: req.user._id });

    await schedule.save();

    return res.status(201).json({
      schedule,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        msg: error.code ?? error.message,
        error,
      },
    });
  }
};

export default { createSchedule };
