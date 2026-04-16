import { Request, Response } from 'express';
import { assessmentSchema } from '../schemas/assessment';
import { processAssessment } from '../services/assessmentService';

export const submitAssessment = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = assessmentSchema.parse(req.body);
    const recommendation = await processAssessment(data);
    
    res.status(200).json({
      success: true,
      data: {
        recommendationId: recommendation.id,
      }
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: 'Validation Error', details: error.errors || error.message });
  }
};
