import type { AssessmentInput } from '../schemas/assessment';

export type AxisScores = {
  internalExternal: number; // -1 (External) to 1 (Internal)
  proprietaryOpen: number; // -1 (Open) to 1 (Proprietary)
  perimeter: number; // -1 (De-perimeterised) to 1 (Perimeterised)
  sourcing: number; // -1 (Outsourced) to 1 (Insourced)
};

export const calculateScores = (input: AssessmentInput): AxisScores => {
  let internalExternal = 0;
  let proprietaryOpen = 0;
  let perimeter = 0;
  let sourcing = 0;

  // Security Need
  if (input.securityLevel === 'high') {
    internalExternal += 0.6;
    perimeter += 0.7;
    sourcing += 0.3;
  } else if (input.securityLevel === 'low') {
    internalExternal -= 0.5;
    perimeter -= 0.5;
  }

  // Budget
  if (input.budgetLevel === 'low') {
    sourcing -= 0.6; // outsource to save costs
    proprietaryOpen -= 0.4; // open source is cheaper
  }

  // Control Need
  if (input.controlNeed === 'high') {
    sourcing += 0.8;
    proprietaryOpen += 0.2;
    internalExternal += 0.4;
  } else if (input.controlNeed === 'low') {
    sourcing -= 0.7;
  }

  // Portability
  if (input.portabilityNeed === 'high') {
    proprietaryOpen -= 0.8; // highly open
  }

  // Collaboration
  if (input.collaborationLevel === 'high') {
    perimeter -= 0.8;
    internalExternal -= 0.5;
  }

  // Team Size
  if (input.teamSize === 'small') {
    sourcing -= 0.7; // too small, need to outsource
  } else if (input.teamSize === 'large') {
    sourcing += 0.6;
  }

  return {
    internalExternal: Math.max(-1, Math.min(1, internalExternal)),
    proprietaryOpen: Math.max(-1, Math.min(1, proprietaryOpen)),
    perimeter: Math.max(-1, Math.min(1, perimeter)),
    sourcing: Math.max(-1, Math.min(1, sourcing)),
  };
};
