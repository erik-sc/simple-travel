import Plan from "../../constants/plans";

export interface HomeFormProps {
    retirementAge: number;
    retirementDate: string;
    birthDate: string;
    currentAmount: number;
    plan: Plan
    otherAmounts: number;
    sex: "M" | "F"; 
    simulationType: "withdrawal" | "retirement" 
}