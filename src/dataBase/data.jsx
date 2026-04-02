/*Este archivo debe contener los datos iniciales de los clientes ordenes y tecnicos */

import { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const { data, error } = await supabase
      .from('ClientsOrdersF')
      .select('*')

    if (error) {
      console.log('Error:', error)
    } else {
      console.log('Data:', data)
    }
  }

  return <h1>Probando Supabase</h1>
}

export default App