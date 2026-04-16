import { Request, Response } from 'express';
import { prisma } from '../lib/db';

export const getResult = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const recommendation = await prisma.recommendation.findUnique({
      where: { id },
      include: {
        assessment: true
      }
    });

    if (!recommendation) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }

    res.status(200).json({ success: true, data: recommendation });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
