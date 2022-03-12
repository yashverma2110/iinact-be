import express from "express";
import userControllers from "../controller/user.controller";
import validatePayload from "../middleware/validatePayload";
import userPayloadValidator from "../utils/validator/user.validator";
import auth from "../middleware/auth";

const router = express.Router();

router.post(
  "/signup",
  validatePayload(userPayloadValidator.signup),
  userControllers.signUp
);
router.post("/login", userControllers.logIn);
router.get("/details", auth.checkAuth, userControllers.getUser);

export default router;
