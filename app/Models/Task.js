'use strict'

const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendMailNewTask')
    this.addHook('beforeUpdate', 'TaskHook.sendMailNewTask')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
