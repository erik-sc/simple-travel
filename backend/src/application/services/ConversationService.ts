import { ChatCompletionMessageParam } from 'openai/resources'
import { BUDGET_TOKEN, INITIAL_PROMPT, LOCATION_TOKEN, TRAVEL_STYLE_TOKEN, USER_PROMPT } from '../../core/constants/prompts'
import { Clients } from '../../types'
import { Itinerary } from '../../core/models/Itinerary.model'

export class ConversationService {
  private clients: Clients

  constructor(clients: Clients) {
    this.clients = clients
  }

  public async converse() {
    const { text } = await this.conversationText()
    return { text }
  }

  private conversationText = async () => {
    const systemMessage: ChatCompletionMessageParam = { role: 'system', content: INITIAL_PROMPT };
    const locations = "{location: Porto Alegre, days: 2}, {location: Morro Reuter, days: 1}, {location: Novo Hamburgo, days: 2}";
    const budget = "$5000";
    const travelStyle = "Basic";
    const processedPrompt = USER_PROMPT
      .replace(LOCATION_TOKEN, locations)
      .replace(BUDGET_TOKEN, budget)
      .replace(TRAVEL_STYLE_TOKEN, travelStyle);
    const userMessage: ChatCompletionMessageParam = { role: 'user', content: processedPrompt }
    const conversationMessages = [systemMessage, userMessage]

    try {
      const response = await this.clients.deepseek.completion(conversationMessages)
      const generatedText = response?.choices[0]?.message?.content || ''
      const itinerary = generatedText as unknown as Itinerary[];
      console.log(generatedText);
      return { text: generatedText }
    } catch (error) {
      throw new Error('Failed to generate response')
    }
  }
}