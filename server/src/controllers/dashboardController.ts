import { Request, Response } from 'express';
import { prisma } from '../lib/db';

export const getAssessments = async (req: Request, res: Response): Promise<void> => {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { recommendation: true }
    });

    res.status(200).json({ success: true, data: assessments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
