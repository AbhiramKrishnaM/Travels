import { Router } from "express";

import {
  createUser,
  loginUser,
  logoutUser,
} from "../controller/userController";

const userRouter = Router();

userRouter.post("/add", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
