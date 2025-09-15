import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', handleRefreshToken);

export default router;