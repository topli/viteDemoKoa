const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const chatObject = {
  ChatId: objectId,
  members: [{
    type: objectId,
    ref: 'User'
  }],
  type: 'session' | 'group' | 'robot',
  unread: Number,
  show: Boolean,
  newMsg: String,
  newTime: Number
}

const ChatSchema = new Schema(chatObject);

const ChatModel = mongoose.model('Chat', ChatSchema)

module.exports = {
  ChatModel
}