const bcrypt = require('bcryptjs')
// 加密
const encrypt = password => {
  let salt = bcrypt.genSaltSync(5)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}
// 验证密码
const decrypt = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  encrypt,
  decrypt
}