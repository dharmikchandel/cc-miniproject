import { Router } from 'express';
import { submitAssessment } from '../controllers/assessmentController';

const router = Router();

router.post('/', submitAssessment);

export default router;
