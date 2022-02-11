const Crypt = require("../utils/crypt");
const { ChatModel } = require("../model/chat");
const { success, error } = require('../utils/logs');
const { MessagesModel } = require("../model/messages");

const List = async (ctx, next) => {
  const user = ctx.state.info
  let list = await ChatModel.find({ show: true, members: { $elemMatch: { $eq: user.id } } }).populate('members')
  // 查找最新消息数据
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const message = await MessagesModel.where('sessionId').equals(item._id).sort([['time', -1]]).limit(1)
    if (message[0]) {
      item.newMsg = message[0].content
      item.newTime = message[0].time
    }
  }
  ctx.body = {
    code: 200,
    data: list
  }
}

const SaveChat = async (ctx, next) => {
  const body = ctx.request.body
  const ChatEntity = new ChatModel(body);
  await ChatEntity.save()
    .then((res) => {
      ctx.body = {
        code: 200,
        msg: "创建成功"
      };
    })
    .catch(() => {
      ctx.body = {
        code: 500,
        msg: "创建失败"
      };
    });
}

const DeleteChat = async (ctx, next) => {
  const body = ctx.request.body;
  const chat = await ChatModel.findByIdAndUpdata(body)
}

const Generate = async (ctx, next) => {
  const body = ctx.request.body;
  const user = ctx.state.info;
  let entity = await ChatModel.findOne({
    members: { $elemMatch: { $eq: body.members[0] } }
  }).and({
    members: { $elemMatch: { $eq: body.members[1] } }
  })
  if (!entity) {
    const ChatEntity = new ChatModel(body);
    entity = await ChatEntity.save()
  }
  const data = await ChatModel.findById(entity._id).populate('members')
  ctx.body = {
    code: 200,
    data
  }
}
module.exports = {
  List,
  SaveChat,
  DeleteChat,
  Generate
}