import { Router } from "express";
import { login, logout, register, } from "../controllers/user.controller.js";
// import { isLoggedIn } from "../middleware/auth.middleware.js";
// import upload from "../middleware/multer.middleware.js";

const router = Router();
router.post('/register' , register);
router.post('/login' , login);
router.get('/logout' , logout);

export default router;