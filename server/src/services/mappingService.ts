import { AxisScores } from './scoringService';

export const CLOUD_MODELS = [
  {
    id: "sp-stop",
    name: "Service Provider / One-stop resources",
    ccmPosition: { internalExternal: -0.8, proprietaryOpen: 0.5, perimeter: -0.5, sourcing: -0.9 },
    summary: "A heavily outsourced, external public cloud solution ideal for raw capacity without managing infrastructure.",
    pros: ["Low capital expenditure", "High scalability", "Zero maintenance"],
    cons: ["High vendor lock-in", "Lowest control", "Potential compliance issues"]
  },
  {
    id: "inhouse-private",
    name: "In-house Private Cloud",
    ccmPosition: { internalExternal: 0.9, proprietaryOpen: 0.8, perimeter: 0.9, sourcing: 0.9 },
    summary: "Fully insourced, internal cloud behind a strong corporate firewall.",
    pros: ["Ultimate control", "Highest security", "Data sovereignty"],
    cons: ["High upfront cost", "Requires large IT team", "Hard to scale quickly"]
  },
  {
    id: "hybrid-federated",
    name: "Hybrid Federated Cloud",
    ccmPosition: { internalExternal: 0.0, proprietaryOpen: -0.3, perimeter: 0.4, sourcing: 0.0 },
    summary: "Mix of internal control with burst capacity to external providers, heavily relying on open standards for portability.",
    pros: ["Best of both worlds", "High flexibility", "Cost optimization"],
    cons: ["High complexity", "Integration challenges", "Management overhead"]
  },
  {
    id: "community-cloud",
    name: "Community Cloud",
    ccmPosition: { internalExternal: 0.2, proprietaryOpen: -0.6, perimeter: 0.5, sourcing: -0.3 },
    summary: "Shared infrastructure for a specific community (e.g., healthcare providers) with shared compliance standards.",
    pros: ["Shared costs", "Built-in compliance", "Ecosystem collaboration"],
    cons: ["Customization limits", "Shared risk", "Complex governance"]
  },
  {
    id: "enterprise-cloud",
    name: "All-in-one Enterprise Cloud",
    ccmPosition: { internalExternal: -0.5, proprietaryOpen: 0.7, perimeter: 0.8, sourcing: -0.5 },
    summary: "Proprietary enterprise-grade public cloud (e.g. AWS/Azure) with strict perimeter controls like VPCs.",
    pros: ["Enterprise feature set", "Robust security tools", "Managed services"],
    cons: ["Proprietary lock-in", "High operating costs at scale"]
  },
  {
    id: "government-cloud",
    name: "Government-funded Cloud",
    ccmPosition: { internalExternal: 0.5, proprietaryOpen: 0.0, perimeter: 1.0, sourcing: 0.5 },
    summary: "Highly perimeterized, regulated cloud environments designed for public sector compliance.",
    pros: ["Maximum compliance", "Stable", "Highly audited"],
    cons: ["Slow innovation", "Restricted access", "Expensive"]
  },
  {
    id: "vc-backed-cloud",
    name: "Venture Capital-backed Cloud",
    ccmPosition: { internalExternal: -0.9, proprietaryOpen: -0.8, perimeter: -0.9, sourcing: -0.9 },
    summary: "Highly agile, open-source driven, fully external and de-perimeterized modern cloud ecosystems (e.g. Vercel/Render).",
    pros: ["Extremely fast iteration", "Developer friendly", "Bleeding edge tech"],
    cons: ["Startup risk", "Changing pricing models", "Lower enterprise support"]
  },
  {
    id: "entertainment-cloud",
    name: "Entertainment/Social Cloud",
    ccmPosition: { internalExternal: -1.0, proprietaryOpen: 0.5, perimeter: -1.0, sourcing: -1.0 },
    summary: "Massively scaled, external, de-perimeterised environments focusing on global CDN delivery.",
    pros: ["Edge delivery", "Massive concurrency"],
    cons: ["Not for sensitive data", "Hard to secure endpoints"]
  }
];

export const mapToModels = (scores: AxisScores) => {
  // Euclidean distance calculator
  const calculateDistance = (a: AxisScores, b: Record<string, number>) => {
    return Math.sqrt(
      Math.pow(a.internalExternal - b.internalExternal, 2) +
      Math.pow(a.proprietaryOpen - b.proprietaryOpen, 2) +
      Math.pow(a.perimeter - b.perimeter, 2) +
      Math.pow(a.sourcing - b.sourcing, 2)
    );
  };

  const scoredModels = CLOUD_MODELS.map(model => ({
    ...model,
    distance: calculateDistance(scores, model.ccmPosition),
    // convert distance to a confidence percentage (max distance in 4D space is sqrt(16) = 4)
    confidence: Math.max(0, 100 - (calculateDistance(scores, model.ccmPosition) / 4) * 100)
  }));

  // Sort by closest (highest confidence)
  scoredModels.sort((a, b) => b.confidence - a.confidence);

  return {
    primary: scoredModels[0],
    secondaries: scoredModels.slice(1, 4)
  };
};
