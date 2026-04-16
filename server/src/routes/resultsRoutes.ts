import { Router } from 'express';
import { getResult } from '../controllers/resultsController';

const router = Router();

router.get('/:id', getResult);

export default router;
