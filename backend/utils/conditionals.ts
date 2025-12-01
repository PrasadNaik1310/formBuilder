// backend/utils/conditional.ts
interface Condition {
    questionKey: string;
    operator: "equals" | "notEquals" | "contains";
    value: any;
}

interface ConditionalRules {
    logic: "AND" | "OR";
    conditions: Condition[];
}

export function shouldShowQuestion(rules: ConditionalRules | null, answersSoFar: Record<string, any>): boolean {
    if (!rules) return true;

    const results = rules.conditions.map(cond => {
        const answer = answersSoFar[cond.questionKey];
        if (answer === undefined) return false;

        switch(cond.operator) {
            case "equals": return answer === cond.value;
            case "notEquals": return answer !== cond.value;
            case "contains": return Array.isArray(answer) ? answer.includes(cond.value) : false;
            default: return false;
        }
    });

    if (rules.logic === "AND") return results.every(Boolean);
    return results.some(Boolean); // OR
}
