const JWT = require('../utils/jwt');

const Auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  const info = JWT.verify(token);
  if (info) {
    ctx.state.info = info; // 将信息存放到 state 中
  } else {
    ctx.throw(401, 'token error');
  }
  await next();
};

module.exports = Auth;