import dotenv from 'dotenv'
import OpenAI from "openai"
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources'
import { IAIClientService } from '../../core/models/services/IClientService'

dotenv.config()

export class AIClientService implements IAIClientService {
    private client: OpenAI

    constructor() {
        this.client = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_KEY
        })
    }

    public async completion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion & { _request_id?: string | null | undefined } | undefined> {
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
}
