const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const messageObject = {
  id: objectId,
  content: String,
  time: String,
  type: String,
  from: { type: objectId, ref: 'User' },
  sessionId: { type: objectId, ref: 'Chat' }
}

const MessagesSchema = new Schema(messageObject);

const MessagesModel = mongoose.model('Messages', MessagesSchema)

module.exports = {
  MessagesModel
}