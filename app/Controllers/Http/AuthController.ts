import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Merchant from 'App/Models/Merchant'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import ResponseController from './ResponsesController'
import Hash from '@ioc:Adonis/Core/Hash'


export default class MerchantsController extends ResponseController{

    public async register({request, response}: HttpContextContract) {

        const validatedData = await request.validate(RegisterValidator)

        const merchant = new Merchant

        merchant.name = validatedData.name
        merchant.email = validatedData.email
        merchant.merchantKey = Math.random().toString().substr(2, 12)
        merchant.password = validatedData.password
        
        merchant.save()

        return this.sendResponse(response, 'Merchant created successfully', merchant)
    }



    public async login({request, response, auth}: HttpContextContract) {
        const {email, password} = await request.validate(LoginValidator)

        const merchant = await Merchant.query().where('email', email).first()

        if(!merchant){
            return this.notFound(response, 'We could not find user with this email', [])
        }

        const passwordVerified = await Hash.verify(merchant!.password, password)

        if (!passwordVerified) {
           return this.sendError(response, 'Authentication failed',[])
          }

          const token = await auth.use('api').generate(merchant!)

          return this.sendResponse(response, 'Authenticated successfully', [merchant, token])

    }


}
