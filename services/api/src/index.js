const Koa = require('koa')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const { MammothGQL } = require('./graphql')
const auth = require('./middleware/auth')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const dataSources = require('./datasources')

const app = new Koa()

const mammoth = MammothGQL({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ ctx }) => ({
    user: ctx.state.user || null,
  }),
})

app.use(bodyParser())
app.use(cors())
app.use(auth)
app.use(mammoth)

app.listen({ port: 3000 }, () => {
  console.log('listening on port 3000...')
})