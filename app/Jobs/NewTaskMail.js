'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskMail-job'
  }

  async handle (data) {
    const { email, username, title, file } = data

    console.log(`Job ${NewTaskMail.key} executed!`)

    await Mail.send(
      'emails.task_new',
      { username, title, hasAttachment: !!file },
      message => {
        message
          .to(email)
          .from('sites.brenofranca@gmail.com', 'FBSystems')
          .subject('Nova tarefa pra você')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.hash}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
