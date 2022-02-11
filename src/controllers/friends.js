const Crypt = require("../utils/crypt");
const { MessagesModel } = require("../model/messages");
const { success, error } = require('../utils/logs')

const List = async (ctx, next) => {
  const user = ctx.state.info
  const list = MessagesModel.findAll({ show: true, u: user.u })
  ctx.body = {
    code: 200,
    data: list
  }
}

module.exports = {
  List,
}