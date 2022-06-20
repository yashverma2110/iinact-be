import express from "express";
import submissionController from "../controller/submission.controller";
import auth from "../middleware/auth";
import validatePayload from "../middleware/validatePayload";
import submissionValidator from "../utils/validator/submission.validator";

const router = express.Router();

router.post(
  "/create",
  auth.checkAuth,
  validatePayload(submissionValidator.submissionCreate),
  submissionController.createSubmission
);

export default router;
