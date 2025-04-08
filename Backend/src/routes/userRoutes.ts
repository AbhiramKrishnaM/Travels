import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "src/controller/userControlle";

const router = Router();

router.post("/adduser", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
