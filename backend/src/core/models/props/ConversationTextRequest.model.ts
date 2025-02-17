export interface ConversationTextRequest {
    locations: {location: string, days: number}[];
    budget: number;
    travelStyle: "Adventure" |"Basic" | "Luxury" | "Budget"; 
}