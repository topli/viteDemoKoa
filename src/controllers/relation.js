const Crypt = require("../utils/crypt");
const { RelationModel } = require("../model/relation");
const { success, error } = require('../utils/logs');
const { slugify } = require("transliteration");

const Save = async (ctx, next) => {
  const data = ctx.request.body
  const find = await RelationModel.findOne({
    $or: [
      {
        linkToId: data.userId
      },
      {
        linkFromId: data.userId
      }
    ]
  }).and({
    $or: [
      {
        linkToId: data.friendId
      },
      {
        linkFromId: data.friendId
      }
    ]
  })
  if (find) {
    ctx.body = {
      code: 200,
      message: '你们已经是好友了！'
    }
  } else {
    if (data.userId && data.friendId) {
      const RelationEntity = new RelationModel({ linkFromId: data.userId, linkToId: data.friendId });
      const res = await RelationEntity.save()
      ctx.body = {
        code: 200,
        data: res
      }
    } else {
      ctx.throw(500, 'userId, friendId is required');
    }
  }
}

const List = async (ctx, next) => {
  const userId = ctx.state.info.id
  let arr = await RelationModel.find({ linkFromId: userId}).populate('linkFromId').populate('linkToId')
  let friendArr = arr.map(item => {
    return item.linkToId
  })
  friendArr = friendArr.sort((a, b) => {
    const sortStr1 = a.nickName || a.account
    const sortStr2 = b.nickName || b.account
    return sortStr1.localeCompare(sortStr2)
  })
  const data = []

  friendArr.forEach(item => {
    let pinyin = slugify(item.nickName, { fixChineseSpacing: false })
    const frist = pinyin.charAt().toLocaleUpperCase()

    let index = data.findIndex(item => item.key === frist)
    if (index !== -1) {
      data.values.push(item)
    } else {
      data.push({
        key: frist,
        values: [item]
      })
    }
  })
  ctx.body = {
    code: 200,
    data: data || []
  }
}

const Search = async (ctx, next) => {
  const firendId = ctx.request.query.id
  const userId = ctx.state.info.id
  if (!firendId) {
    ctx.throw(500, 'id is required')
  }
  const find = await RelationModel.findOne({
    $or: [
      {
        linkToId: userId
      },
      {
        linkFromId: userId
      }
    ]
  }).and({
    $or: [
      {
        linkToId: firendId
      },
      {
        linkFromId: firendId
      }
    ]
  })
  ctx.body = {
    code: 200,
    data: !!find
  }
}
module.exports = {
  Save,
  List,
  Search
}