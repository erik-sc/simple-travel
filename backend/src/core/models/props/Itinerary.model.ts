import { DayGuideModel as DayGuide } from "./DayGuide.model";

export interface Itinerary {
    location: string;
    description: string;
    days: DayGuide[]; 
}