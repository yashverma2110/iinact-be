import { RequestHandler } from "express";
import List from "../models/List";
import Schedule from "../models/Schedule";

const getSchedules: RequestHandler = async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.user._id });

    // populate list data and schedule url if not there
    for (const idx in schedules) {
      const list = await List.findById(schedules[idx].list, {
        name: 1,
        description: 1,
        urls: 1,
      });

      if (!schedules[idx].current) {
        schedules[idx].current =
          list.urls[Math.floor(Math.random() * list.urls.length) + 1];

        await schedules[idx].save();
      }

      schedules[idx].list = list;
    }

    return res.json({
      schedules,
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

export default { getSchedules, createSchedule };
