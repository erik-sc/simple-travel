import { Router, Request, Response } from 'express'
import { ConversationService } from '../../application/services/ConversationService';

export const createRoutes = (clients: any) => {
  const router = Router();
  const service = new ConversationService(clients);

  router.post('/process', async (req: Request, res: Response) => {
    try {
      const conv = await service.converse();
      res.status(200).send(conv);
    } catch (error) {
      console.error('Error in /converse/text:', error)
      res.status(500).send({ error: 'Failed to generate response' })
    }
  })

  return router
}
