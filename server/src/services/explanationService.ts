import type { AssessmentInput } from '../schemas/assessment';

export const generateExplanation = (input: AssessmentInput, primaryModelName: string) => {
  let explanation = `Based on your organizational profile, the ${primaryModelName} model is the closest fit. `;
  
  if (input.securityLevel === 'high') {
    explanation += "Your stringent security and privacy requirements drove the recommendation towards models providing robust perimeter defense. ";
  }
  
  if (input.budgetLevel === 'low') {
    explanation += "To accommodate a tight budget, the system favored heavily outsourced and open-source leaning models to reduce capital expenditure. ";
  } else if (input.budgetLevel === 'high') {
    explanation += "With a higher budget, models offering premium control and dedicated resources became viable. ";
  }

  if (input.teamSize === 'small') {
    explanation += "Given limited internal IT staff, we prioritized models where the operational burden is outsourced. ";
  } else if (input.teamSize === 'large') {
    explanation += "Your large IT team supports models requiring significant internal control and management capabilities. ";
  }

  if (input.portabilityNeed === 'high') {
    explanation += "Because you explicitly need workload portability, models favoring open standards were prioritized over proprietary lock-in models. ";
  }
  
  return explanation;
};
