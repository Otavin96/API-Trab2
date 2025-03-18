import { Router } from 'express'
import { CreatePaymentController } from '@/payments/infrastructure/http/controller/create-payment.controller'

const paymentRouter = Router()


paymentRouter.post('/', async (req, res) => {
    await CreatePaymentController(req, res);
});  


export {paymentRouter}