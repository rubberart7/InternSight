import { Router } from 'express';
import { analyzeResume } from '../controllers/resumeController.js';

const router = Router();

router.post('/analyze', analyzeResume);

export default router;