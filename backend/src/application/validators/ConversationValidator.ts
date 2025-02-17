import { DayGuideModel } from "../../core/models/props/DayGuide.model";
import { Itinerary } from "../../core/models/props/Itinerary.model";

export class ConversationValidator {
  static validateItineraries(itineraryList: Itinerary[]) {
    itineraryList.map(this.validateItinerary);
  }
  static validateItinerary(itinerary: Itinerary): void {
    if (!itinerary.location || typeof itinerary.location !== 'string') {
      throw new Error('Invalid or missing location');
    }
    if (!itinerary.description || typeof itinerary.description !== 'string') {
      throw new Error('Invalid or missing description');
    }
    if (!itinerary.days || !Array.isArray(itinerary.days)) {
      throw new Error('Invalid or missing days');
    }
    itinerary.days.map(ConversationValidator.validateDayGuide);
  }
  static validateDayGuide(day: DayGuideModel): void {
    if (typeof day.day !== 'number') {
      throw new Error('Invalid or missing day number');
    }
    if (!day.activities || !Array.isArray(day.activities)) {
      throw new Error('Invalid or missing activities');
    }
    if (!day.meals || !Array.isArray(day.meals)) {
      throw new Error('Invalid or missing meals');
    }
    if (!day.transportation || typeof day.transportation !== 'string') {
      throw new Error('Invalid or missing transportations');
    }
  }
}