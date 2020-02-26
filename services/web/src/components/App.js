import React, { useState } from 'react';
import { useQuery, useMutation } from '../context/mammoth'

function App() {
  const { data, loading, error } = useQuery({
    query: `{ me { id firstName } }`,
    variables: {},
  })

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error {`${error}`}</h1>

  return (
    <div className="App">
      howdy {data.me.firstName}
      <br />
    </div >
  )
}

export default App;
