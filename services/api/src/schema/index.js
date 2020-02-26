const User = `
  type User {
    id: Int!
    firstName: String!
  }
`

const RootSchema = `
  type Query {
    me: User
  }

  type Mutation {
    login: String
  }
`

module.exports = [RootSchema, User]