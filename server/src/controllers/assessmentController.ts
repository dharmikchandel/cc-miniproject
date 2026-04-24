import { Request, Response } from 'express';
import { ZodError } from 'zod';
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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.issues,
      });
      return;
    }

    console.error('Assessment submission failed:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
