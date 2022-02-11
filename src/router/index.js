const TestRouter = require('./test')
const UserRouter = require('./user')
const ChatRouter = require('./chat')
const RelationRouter = require('./relation')
const MessagesRouter = require('./messages')

const routers = [TestRouter, UserRouter, ChatRouter, RelationRouter, MessagesRouter]

module.exports = routers