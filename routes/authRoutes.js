import express from "express";
import { register, login, googleLogin, adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/admin-login", adminLogin); // Admin login route

export default router;
