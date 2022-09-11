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

router.patch('/edit/:listId', auth.checkAuth, listController.editList);

router.get('/all', auth.checkAuth, listController.getListsByUser);

export default router;
