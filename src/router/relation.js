const Auth = require('../middleware/auth')
const Router = require('koa-router')
const { Save, List, Search } = require('../controllers/relation')

const RelationRouter = new Router({
  prefix: '/api/relation/'
})
RelationRouter.use(Auth)

RelationRouter.post('save', Save)
RelationRouter.get('list', List)
RelationRouter.get('search', Search)

module.exports = RelationRouter