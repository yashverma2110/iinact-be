import express from "express";
import listController from "../controller/list.controller";
import auth from "../middleware/auth";
import validatePayload from "../middleware/validatePayload";
import listValidator from "../utils/validator/list.validator";

const router = express.Router();

router.post(
  "/create",
  auth.checkAuth,
  validatePayload(listValidator.listCreate),
  listController.createList
);

export default router;
