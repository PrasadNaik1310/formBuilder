
export type Operator = "equals" | "notEquals" | "contains";

export interface Condition {
  questionKey: string;
  operator: Operator;
  value: any;
}

export interface ConditionalRules {
  logic: "AND" | "OR";
  conditions: Condition[];
}

/**
 * Returns true if a question should be shown based on conditional rules and current answers
 */
export function shouldShowQuestion(
  rules: ConditionalRules | null,
  answersSoFar: Record<string, any>
): boolean {
  if (!rules) return true;

  const results = rules.conditions.map((cond) => {
    const answer = answersSoFar[cond.questionKey];

    switch (cond.operator) {
      case "equals":
        return answer === cond.value;
      case "notEquals":
        return answer !== cond.value;
      case "contains":
        return Array.isArray(answer) && answer.includes(cond.value);
      default:
        return true;
    }
  });

  if (rules.logic === "AND") return results.every(Boolean);
  return results.some(Boolean);
}
