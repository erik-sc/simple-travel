import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";

export interface IExternalApiService {
    aiCompletion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion & { _request_id?: string | null | undefined } | undefined>;
    validateLocation(placeName: string): Promise<{ valid: boolean; status?: string; hours?: string }>
}