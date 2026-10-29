import React from 'react'
import { useState } from 'react'
import { createNewEntry } from '../services/entryService'
import { useNavigate } from 'react-router'


function CreateEntry() {
    
    const [ formData, setFormData ] = useState({
        title:'',
        entryBody:'',
        isPublic: false
    })

    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value, type, checked } = event.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()


        try {
            const createdEntry = await createNewEntry(formData)

            navigate('/my-entries')
        } catch (error) {
            console.error('Failed to create entry:', error)
        }
    }


  return (
    <div>
        <h1>Create New Entry</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input 
            name="title"
            type="text"
            id="title"
            onChange={handleChange}
            value={formData.title}
            />
            <label htmlFor="entryBody">Body: </label>
            <input 
            name="entryBody"
            type="text"
            id="entryBody"
            onChange={handleChange}
            value={formData.entryBody}
            />
            <label htmlFor="isPublic">Is Public: </label>
            <input
                name="isPublic"
                type="checkbox"
                id="isPublic"
                onChange={handleChange}
                checked={formData.isPublic}
            />
            <button>Create Entry</button>
          </form>

    </div>
  )
}

export default CreateEntry