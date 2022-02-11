const Auth = require('../middleware/auth')
const Router = require('koa-router')
const { UserRegister, UserInfo, UserLogin, UserSearch, GetInfoById, UserUpdate } = require('../controllers/user')

const UserRouter = new Router({
  prefix: '/api/user/'
})

UserRouter.get('info', Auth, UserInfo)
UserRouter.post('login', UserLogin)
UserRouter.get('search', Auth, UserSearch)
UserRouter.get('infoById', Auth, GetInfoById)
UserRouter.put('update', Auth, UserUpdate)

module.exports = UserRouter