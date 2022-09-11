import express from "express";
import scheduleControllers from "../controller/schedule.controller";
import validatePayload from "../middleware/validatePayload";
import schedulePayloadValidator from "../utils/validator/schedule.validator";
import auth from "../middleware/auth";

const router = express.Router();

router.get('/all', auth.checkAuth, scheduleControllers.getSchedules);

router.post(
  "/create",
  auth.checkAuth,
  validatePayload(schedulePayloadValidator.scheduleValidator),
  scheduleControllers.createSchedule
);

export default router;
