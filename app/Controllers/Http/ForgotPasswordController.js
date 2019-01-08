'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const redirectUrl = request.input('redirect_url')

      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        'emails.password_forgot',
        {
          email,
          token: user.token,
          link: `${redirectUrl}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('fbsystems@gmail.com', 'Breno França | FBSystems')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'O e-mail informado não foi encontrado.' } })
    }
  }
}

module.exports = ForgotPasswordController
