import { Router, Request, Response } from 'express'
import { ConversationService } from '../../application/services/ConversationService';
import { Services } from './startup';

export const createRoutes = (services: Services) => {
  const router = Router();
  const {conversationService} = services;
  router.post('/process', async (req: Request, res: Response) => {
    try {
      const conv = await conversationService.processItinerary(req.body);
      res.status(200).send(conv);
    } catch (error) {
      console.error('Error in /converse/text:', error)
      res.status(500).send({ error: 'Failed to generate response' })
    }
  })

  return router
}
