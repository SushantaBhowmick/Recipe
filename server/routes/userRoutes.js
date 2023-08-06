import express from "express";
import { getAUser, getAllUser, login, register } from "../controllers/User.js";

const router =express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/users').get(getAllUser);
router.route('/user/:id').get(getAUser);

export default router;