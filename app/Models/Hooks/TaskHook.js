'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')
const TaskHook = (exports = module.exports = {})

TaskHook.sendMailNewTask = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { title } = taskInstance
  const file = await taskInstance.file().fetch()
  const { email, username } = await taskInstance.user().fetch()

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
