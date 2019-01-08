'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')
const TaskHook = (exports = module.exports = {})

TaskHook.sendMailNewTask = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { title } = taskInstance
  const file = await taskInstance.file().fetch()
  const { email, username } = await taskInstance.user().fetch()

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
