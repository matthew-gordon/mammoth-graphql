import axios from 'axios'

function configureClient() {
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {},
  })

  return {
    query({ query, variables }) {
      return client.post('/graphql', {
        query,
        variables,
      })
    },

    mutation({ mutation, variables }) {
      return client.post('/graphql', {
        query: mutation,
        variables,
      })
    },
  }
}

export default configureClient
