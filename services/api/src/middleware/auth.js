module.exports = async (ctx, next) => {
  const accessToken = ctx.headers['x-access-token']
  const refreshToken = ctx.headers['x-refresh-token']

  if (!accessToken || refreshToken) {
    return next()
  }

  if (accessToken.split(' ')[0] === 'Bearer') {
    console.log(accessToken.split(' ')[1])
  }

  return next()
}