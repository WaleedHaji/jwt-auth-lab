import React from 'react'
import { getAllMyEntries } from '../services/entryService'
import { useState, useEffect } from 'react'



function MyEntries() {
    const [entries, setEntries] = useState([])

    async function getEntries() {

        const response = await getAllMyEntries()
        setEntries(response)
    }

    useEffect(()=>{getEntries()},[])


  return (
    <div>
        <h1>My Entries</h1>

        {entries.map((oneEntry)=>
            <div key={oneEntry._id}>
                <h2>Title: {oneEntry.title}</h2>
            </div>
        )}
    </div>
  )
}

export default MyEntries