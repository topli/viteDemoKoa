const Auth = require('../middleware/auth')
const Router = require('koa-router')
const { List } = require('../controllers/friends')

const ChatRouter = new Router({
  prefix: '/api/firends/'
})

ChatRouter.use(Auth)

ChatRouter.get('list', List)

module.exports = ChatRouter