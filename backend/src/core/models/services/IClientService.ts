import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";

export interface IAIClientService {
    completion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion & { _request_id?: string | null | undefined } | undefined>;
}