const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})


app.use(async ctx => {
  console.log(ctx)
  ctx.body = 'hello xiuxiu'
  console.log(ctx.body);
  ctx.set({ 'Access-Control-Allow-Origin': "*" })
  if (ctx.originalUrl === '/api/user/login') {
    ctx.body = {
      status: 'success',
      code: 200,
      data: {
        name: 'xiuxiu'
      }
    }
  }
})

app.listen(3001)