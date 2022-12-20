import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Verification from 'App/Models/Verification'
import VerificationValidator from 'App/Validators/VerificationValidator'
import ResponseController from './ResponsesController'

export default class VerificationsController  extends ResponseController{

    public async verify({request, response, auth}: HttpContextContract){

        const validatedData = await request.validate(VerificationValidator)
        const merchant = auth.user

        if(validatedData.merchantKey != merchant?.merchantKey ){
            return this.sendError(response,'Incorrect Merchant key, Please try again', [])
        }else{

            const verification = new Verification

            verification.pinNumber = validatedData.pinNumber
            verification.image = validatedData.image
            verification.dataType = validatedData.dataType
            verification.center = validatedData.center

            await verification.save()
            return this.sendResponse(response, 'Verification was successful', [verification])
        }
    }
}
