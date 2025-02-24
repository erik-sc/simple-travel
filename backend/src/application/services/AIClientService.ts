import dotenv from 'dotenv'
import OpenAI from "openai"
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources'
import { IExternalApiService as IExternalApiService } from '../../core/models/services/IClientService'
import axios from 'axios'

dotenv.config()

export class ExternalApiService implements IExternalApiService {
    private client: OpenAI

    constructor() {
        this.client = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_KEY
        })
    }

    public async aiCompletion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion & { _request_id?: string | null | undefined } | undefined> {
        try {
            const response = await this.client.chat.completions.create({
                messages,
                model: "meta-llama/llama-3.3-70b-instruct:free",
            })
            return response
        } catch (error) {
            console.error('Error connecting to deepseek:', error)
        }
    }

    public async validateLocation(placeName: string): Promise<{ valid: boolean; status?: string; hours?: string }> {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
            {
              params: {
                input: placeName,
                inputtype: 'textquery',
                fields: 'business_status,opening_hours,name',
                key: process.env.GOOGLE_PLACES_API_KEY,
              },
            }
          );
    
          const place = response.data?.candidates?.[0];
          if (!place) return { valid: false };
    
          const isOpen = place.business_status !== 'CLOSED_PERMANENTLY';
          const hours = place.opening_hours?.weekday_text?.join('; ') || 'Horário não disponível';
    
          return { valid: isOpen, status: place.business_status, hours };
        } catch (error) {
          return { valid: false };
        }
      }
    
}
