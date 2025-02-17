import { ChatCompletionMessageParam } from 'openai/resources';
import { BUDGET_TOKEN, INITIAL_PROMPT, LOCATION_TOKEN, CORRECTION_PROMPT, TRAVEL_STYLE_TOKEN, USER_PROMPT, INITIAL_MESSAGE_PARAM, CORRECTION_MESSAGE_PARAM } from '../../core/constants/prompts';
import { Itinerary } from '../../core/models/props/Itinerary.model';
import { ConversationTextRequest } from '../../core/models/props/ConversationTextRequest.model';
import { ConversationValidator } from '../validators/ConversationValidator';
import { DayGuideModel } from '../../core/models/props/DayGuide.model';
import { sanitizeLLMJsonResponse } from '../../core/utils/string.utils';
import { IAIClientService } from '../../core/models/services/IClientService';

export class ConversationService {
  private aiService: IAIClientService;
  private readonly MAX_RETRIES = 0;

  constructor(clients: IAIClientService) {
    this.aiService = clients;
  }

  public processItinerary = async (request: ConversationTextRequest): Promise<Itinerary[]> => {
    const { locations, budget, travelStyle } = request;
    const processedPrompt = USER_PROMPT
      .replace(LOCATION_TOKEN, JSON.stringify(locations))
      .replace(BUDGET_TOKEN, budget.toString())
      .replace(TRAVEL_STYLE_TOKEN, travelStyle);

    const userMessage: ChatCompletionMessageParam = { role: 'user', content: processedPrompt };
    let conversationMessages: ChatCompletionMessageParam[] = [INITIAL_MESSAGE_PARAM, userMessage];

    const firstGuide = await this.tryCompletion(conversationMessages);
    // const finalGuide = await this.tryEnhancing(firstGuide);
    return firstGuide;
  };

  private async tryEnhancing(itinerary: Itinerary[]): Promise<Itinerary[]> {
    throw new Error();
  }

  private async tryCompletion(conversationMessages: ChatCompletionMessageParam[]): Promise<Itinerary[]> {
    let retryCount = 0;

    while (retryCount <= this.MAX_RETRIES) {
      try {
        const response = await this.aiService.completion(conversationMessages);
        const generatedText = response?.choices[0]?.message?.content || '';

        const itinerary = JSON.parse(sanitizeLLMJsonResponse(generatedText))?.itinerary as Itinerary[];
        const sanitizedGuide = this.sanitizeAndValidateItineraryList(itinerary);
        if (!sanitizedGuide) throw new Error();
        return sanitizedGuide;
      } catch (error) {
        retryCount++;
        if (retryCount <= this.MAX_RETRIES) {
          conversationMessages.push(CORRECTION_MESSAGE_PARAM);
        }
      }
    }
    throw new Error('Failed to generate a valid itinerary after multiple attempts.');
  }

  private sanitizeAndValidateItineraryList(itineraryList: Itinerary[]): Itinerary[] | null {
    try {
      ConversationValidator.validateItineraries(itineraryList);
      return itineraryList.map((i): Itinerary => {
        return {
          location: i.location.trim(),
          description: i.description.trim(),
          days: i.days.map((day): DayGuideModel => {
            return {
              day: day.day,
              activities: day.activities.map((activity: string) => activity.trim()),
              meals: day.meals.map((meal: string) => meal.trim()),
              transportation: day.transportation.trim(),
            };
          }),
        };
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}