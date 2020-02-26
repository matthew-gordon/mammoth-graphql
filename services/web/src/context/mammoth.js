import React, { useState, useEffect, createContext, useContext } from 'react'

const MammothContext = createContext()

function MammothProvider({ client, children }) {
  return (
    <MammothContext.Provider value={client}>
      {children}
    </MammothContext.Provider>
  )
}

function useQuery({ query, variables }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const context = useContext(MammothContext)

  async function fetchMore(variables) {
    if (context === undefined) {
      throw new Error(`useQuery must be used within a MammothProvider`)
    }

    try {
      setLoading(true)
      const res = await context.query({ query, variables })
      setData(res.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(error ? [...error, err] : [err])
    }
  }

  useEffect(() => {
    async function runQuery() {
      if (context === undefined) {
        throw new Error(`useQuery must be used within a MammothProvider`)
      }

      try {
        setLoading(true)
        const res = await context.query({ query, variables })
        setData(res.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(error ? [...error, err] : [err])
      }
    }

    runQuery()
  }, [])

  return { data, loading, error, fetchMore }
}

function useMutation({ mutation }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const context = useContext(MammothContext)

  async function runMutation(variables) {
    if (context === undefined) {
      throw new Error(`useMutation must be used within a MammothProvider`)
    }

    try {
      setLoading(true)
      const { data } = await context.mutation({ mutation, variables })
      setLoading(false)
      return data
    } catch (err) {
      setLoading(false)
      setError(error ? [...error, err] : [err])
    }

    return { data }
  }

  return [runMutation, { loading, error }]
}

function useMammothClient() {
  const context = useContext(MammothContext)

  if (context === undefined) {
    throw new Error(`useMammothClient must be used within a MammothProvider`)
  }


  return context
}

export { MammothProvider, useMammothClient, useQuery, useMutation }
