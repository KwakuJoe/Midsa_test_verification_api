import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({},[
      rules.unique({ table: 'merchants', column: 'name' })
    ]),
    email: schema.string({},[
      rules.email(),
      rules.unique({ table: 'merchants', column: 'email' })
    ]),
    // merchantKey: schema.string({},[
    //   rules.unique({ table: 'merchants', column: 'merchant_key' })
    // ]),
    password:schema.string({}, [
      rules.minLength(8),

      rules.confirmed('confirmPassword')
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'requires':'{{field}} is required to create a merchant',
    'password.minLength':'Password should be at least 8 characters',
    'email.unique':'This email already exist, please try with different email',
    'name.unique':'This name already exist, please try with different name',
  }
}
