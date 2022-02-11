const Crypt = require("../utils/crypt");
const { MessagesModel, UserModel, ChatModel } = require("../model");
const { success, error } = require('../utils/logs')
const { pub } = require('./mqtt')

const getMessageList = async (ctx, next) => {
  const sessionId = ctx.request.query.sessionId
  const list = await MessagesModel.find({ sessionId }).populate('from')
  ctx.body = {
    code: 200,
    data: list
  }
}

const sendMessage = async (ctx, next) => {
  const body = ctx.request.body
  const MessageEntity = new MessagesModel(body);
  await MessageEntity.save()
    .then((res) => {
      // 推送到会话对象
      const result = {
        type: 'message',
        data: res
      }
      publishMessage(body.sessionId, result)
      ctx.body = {
        code: 200,
        msg: "发送成功"
      };

    })
    .catch(() => {
      ctx.body = {
        code: 500,
        msg: "发送失败"
      };
    });
}
// 找到需要推送消息的会话并对会话人员推送消息
const publishMessage = async (sessionId, result) => {
  let chat = await ChatModel.findOne({ _id: sessionId }).populate('members')
  if (!chat.show) {
    publishSession(chat)
  }
  let from = await UserModel.findOne({ _id: result.data.from })
  result.data.from = from
  chat.members.forEach(item => {
    pub(item._id.toString(), result)
  })
}
// 找到需要推送会话的人员并对人员推送会话
const publishSession = async (chat) => {
  let result = await ChatModel.findByIdAndUpdate(chat._id, { show: true }).populate('members')
  const message = await MessagesModel.where('sessionId').equals(chat._id).sort([['time', -1]]).limit(1)
  if (message[0]) {
    result.newMsg = message[0].content
    result.newTime = message[0].time
  }
  chat.members.forEach(item => {
    pub(item._id.toString(), {type: 'session',data: result})
  })
}
module.exports = {
  getMessageList,
  sendMessage
}