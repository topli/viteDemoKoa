const merge = require('utils-merge')
const success = (params) => {
  if (typeof params === "string") {
    return {
      code: 200,
      message: params
    }
  } else {
    return merge({ code: 200 }, params)
  }
}
const error = (params) => {
  if (typeof params === "string") {
    return {
      code: 500,
      message: params
    }
  } else {
    return merge({ code: 500 }, params)
  }
}

module.exports = {
  success,
  error
}