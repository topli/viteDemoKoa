const Auth = require('../middleware/auth')
const Router = require('koa-router')
const { getMessageList, sendMessage } = require('../controllers/messages')

const MessageRouter = new Router({
  prefix: '/api/messages/'
})

MessageRouter.use(Auth)

MessageRouter.get('list', getMessageList)
MessageRouter.post('send', sendMessage)

module.exports = MessageRouter