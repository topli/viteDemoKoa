const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const friendsObject = {
  id: objectId,
  content: String,
  time: String,
  type: String,
}

const FriendsSchema = new Schema(friendsObject);

const FriendsModel = mongoose.model('Friends', FriendsSchema)

module.exports = {
  FriendsModel
}