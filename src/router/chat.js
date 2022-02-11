const Auth = require('../middleware/auth')
const Router = require('koa-router')
const { List, Generate } = require('../controllers/chat')

const ChatRouter = new Router({
  prefix: '/api/chat/'
})

ChatRouter.use(Auth)

ChatRouter.get('list', List)
ChatRouter.post('generate', Generate)


module.exports = ChatRouter