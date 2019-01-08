'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const credentials = await auth.attempt(email, password)

    const user = await User.findBy('email', email)

    return {
      user,
      credentials
    }
  }
}

module.exports = SessionController
