// const Crypt = require("../utils/crypt");
const { UserModel } = require("../model/user");
const { success, error } = require('../utils/logs')
const JWT = require('../utils/jwt')
const Pinyin = require('wd-hanzi2pinyin')

const UserInfo = async (ctx, next) => {
  if (ctx.state.info) {
    const find = await UserModel.findOne({ account: ctx.state.info.u })
    if (!find) {
      ctx.throw(500, '未找到用户')
      return
    }
    ctx.body = {
      code: 200,
      data: {
        phone: find.phone,
        nickName: find.nickName,
        account: find.u,
        weId: find.weId,
        id: find._id,
        _id: find._id
      }
    }
  }
}

const UserLogin = async (ctx, next) => {
  const data = ctx.request.body;
  let user = await UserModel.findOne({ account: data.u })
  if (!user) {
    const newUser = new UserModel({ account: data.u, u: data.u, phone: data.u, weId: 'weixin_' + Date.now() })
    user = await newUser.save()
  }
  const token = JWT.generate({account: user.account, id: user._id});
  ctx.body = success({token, data: user})
}

const UserSearch = async (ctx, next) => {
  const { text } = ctx.request.query
  const reg = new RegExp(text, 'i') //不区分大小写
  const arr = await UserModel.find({
    $or : [ //多条件，数组
      {weId : {$regex : reg}},
      {phone : {$regex : reg}}
    ]
  }).nor({ _id: ctx.state.info.id })
  ctx.body = {
    code: 200,
    data: arr || []
  }
}

const GetInfoById = async (ctx, next) => {
  if (ctx.request.query.id) {
    const find = await UserModel.findOne({ _id: ctx.request.query.id })
    ctx.body = {
      code: 200,
      data: find
    }
  } else {
    ctx.throw(500, 'id is required');
  }
}

const UserUpdate = async (ctx, next) => {
  const {id, key, value} = ctx.request.body
  if (id) {
    try {
     const data = await UserModel.findByIdAndUpdate(id, {[key]: value})
      ctx.body = {
        code: 200,
        data
      }
    } catch (error) {
      ctx.throw(500, error)
    }
  } else {
    ctx.throw(500, 'id is required');
  }
}
module.exports = {
  UserInfo,
  UserLogin,
  UserSearch,
  UserUpdate,
  GetInfoById
}