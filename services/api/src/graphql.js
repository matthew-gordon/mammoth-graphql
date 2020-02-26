const { Source, execute, parse } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

exports.MammothGQL = function MammothGQL(options) {
  return async (ctx, next) => {
    const { query, variables: variableValues } = ctx.request.body


    console.log(query)
    const schema = makeExecutableSchema({
      typeDefs: options.typeDefs,
      resolvers: options.resolvers,
    })

    const contextValue = {
      dataSources: options.dataSources,
      ...options.context({ ctx }),
    }

    const document = parse(new Source(query, 'GraphQL request'))

    const { data, errors } = await execute({
      schema,
      contextValue,
      document,
      variableValues,
    })

    if (data) {
      ctx.body = { data }
    }

    if (errors) {
      console.log(errors)
    }

    ctx.status = 200

    await next()
  }
}