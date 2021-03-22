import { Router } from 'express';
import WhatsappBot from '../controllers/WhatsappBot';

const botRouter = Router();

botRouter.post('/incoming', WhatsappBot.actionBot);

export default botRouter;
