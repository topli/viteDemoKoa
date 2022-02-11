const Router = require('koa-router')
const mongoose = require('mongoose')
const { UserSchema } = require('../model/user')
const JWT = require('../utils/jwt')

const LoginUouter = new Router({
  prefix: '/api'
})

var User = mongoose.model('User', UserSchema);

LoginUouter.post('/test', async (ctx, next) => {
  const data = await User.findOne({})
  const token = JWT.generate({ user: '123', p: '132'}, '1d');
  ctx.response.body = { token: token}
})

module.exports = LoginUouter