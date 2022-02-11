const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const userObject = {
  UserId: objectId,
  u:String,
  p: String,
  account: String,
  phone: String,
  nickName: String,
  weId: String,
  pinyin: String
}

const UserSchema = new Schema(userObject);

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
  UserModel
}