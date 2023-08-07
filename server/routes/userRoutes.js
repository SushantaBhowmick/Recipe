import express from "express";
import { deleteUser, getAUser, getAllUser, login, register, updateUser } from "../controllers/User.js";

const router =express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/users').get(getAllUser);
router.route('/user/:id').get(getAUser);
router.route('/user/:id').delete(deleteUser);
router.route('/user/:id').put(updateUser);

export default router;