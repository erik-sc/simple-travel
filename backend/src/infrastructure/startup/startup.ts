import { AIClientService } from "../../application/services/AIClientService";
import { ConversationService } from "../../application/services/ConversationService";

export type Services = {
    aiService: AIClientService; 
    conversationService: ConversationService;
}
export function startup(): Services {
    var aiService = new AIClientService();
    var conversationService = new ConversationService(aiService);

    return {
        aiService,
        conversationService
    }
}