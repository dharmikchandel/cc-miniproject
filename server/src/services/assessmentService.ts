import { prisma } from '../lib/db';
import type { AssessmentInput } from '../schemas/assessment';
import { calculateScores } from './scoringService';
import { mapToModels } from './mappingService';
import { generateExplanation } from './explanationService';

export const processAssessment = async (input: AssessmentInput) => {
  const scores = calculateScores(input);
  const mappedResults = mapToModels(scores);
  const explanationString = generateExplanation(input, mappedResults.primary.name);
  
  const assessment = await prisma.assessment.create({
    data: {
      organizationName: input.organizationName,
      industry: input.industry,
      budgetLevel: input.budgetLevel,
      securityLevel: input.securityLevel,
      complianceLevel: input.complianceLevel,
      collaborationLevel: input.collaborationLevel,
      portabilityNeed: input.portabilityNeed,
      controlNeed: input.controlNeed,
      teamSize: input.teamSize,
    }
  });

  const recommendation = await prisma.recommendation.create({
      data: {
          assessmentId: assessment.id,
          primaryModel: JSON.stringify(mappedResults.primary),
          secondaryModels: JSON.stringify(mappedResults.secondaries),
          axisScores: JSON.stringify(scores),
          explanation: explanationString,
          confidenceScore: mappedResults.primary.confidence
      }
  });

  return recommendation;
};
