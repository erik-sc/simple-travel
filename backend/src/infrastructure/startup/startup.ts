import { ExternalApiService } from "../../application/services/AIClientService";
import { ConversationService } from "../../application/services/ConversationService";

export type Services = {
    aiService: ExternalApiService; 
    conversationService: ConversationService;
}
export function startup(): Services {
    var aiService = new ExternalApiService();
    var conversationService = new ConversationService(aiService);

    return {
        aiService,
        conversationService
    }
}