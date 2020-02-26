const resolvers = {
  Query: {
    me: (_, __, { user }) => user,
  },
  Mutation: {
    login: (_, __, { dataSources }) => {
      return dataSources.userAPI.login()
    },
  },
}

module.exports = resolvers
