import { z } from 'zod';

export const assessmentSchema = z.object({
  organizationName: z.string().min(1, 'Required'),
  industry: z.string().min(1, 'Required'),
  budgetLevel: z.enum(['low', 'medium', 'high']),
  securityLevel: z.enum(['low', 'medium', 'high']),
  complianceLevel: z.enum(['low', 'medium', 'high']),
  collaborationLevel: z.enum(['low', 'medium', 'high']),
  portabilityNeed: z.enum(['low', 'medium', 'high']),
  controlNeed: z.enum(['low', 'medium', 'high']),
  teamSize: z.enum(['small', 'medium', 'large']),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;
