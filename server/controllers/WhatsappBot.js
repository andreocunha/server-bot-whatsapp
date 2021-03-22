import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async actionBot(req, res, next) {
    const twiml = new MessagingResponse();
    const q = req.body.Body;
    
    let expressao = q.split(" ");
    let comando = expressao[0].toLowerCase();

    if(comando === 'calcule')
    {
      expressao.shift();
      expressao = expressao.join('')
      let resultado = 0
      try{
        resultado = eval(expressao)
      }catch(error){
        twiml.message(`Não consegui calcular. Verifique se a expressão foi escrita corretamente e tente novamente`);
        res.set('Content-Type', 'text/xml');
        return res.status(200).send(twiml.toString());
      }
      
      try {
        twiml.message(`RESULTADO: ${resultado}`);
        res.set('Content-Type', 'text/xml');

        return res.status(200).send(twiml.toString());
      } catch (error) {
        return next(error);
      }

    }

    else if(comando === 'start')
    { 
      try {
        twiml.message('join lamp-appropriate');
        res.set('Content-Type', 'text/xml');

        return res.status(200).send(twiml.toString());
      } catch (error) {
        return next(error);
      }
    }
  }
}

export default WhatsappBot;
