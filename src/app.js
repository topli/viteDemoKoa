const Koa = require('koa');
const app = new Koa();
// 连接mongoDB
require('./db/mongo')
var bodyParser = require('koa-bodyparser');

app.use(bodyParser());

const routers = require('./router/index')
routers.forEach(router => {
  app.use(router.routes())
})

require('./serve/mqtt')

// 在端口8081监听:
app.listen(8081);
console.log('app started at port 8081...')