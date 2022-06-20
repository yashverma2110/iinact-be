import { RequestHandler } from "express";
import Submission from "../models/Submission";

const createSubmission: RequestHandler = async (req, res) => {
  try {
    const submission = new Submission({ ...req.body, user: req.user._id });

    await submission.save();

    res.status(201).json({
      success: true,
      submission,
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

export default { createSubmission };
