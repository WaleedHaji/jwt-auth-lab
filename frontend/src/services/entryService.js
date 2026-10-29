import api from "./api";

// createEntry
async function createNewEntry(entryBody) {
    const response = await api.post('/entries', entryBody)
    return response.data
    
}


// all public entries
async function getAllPublicEntries() {
    const response = await api.get('/entries')
    return response.data
    
}


// myEntries

async function getAllMyEntries() {
    const response = await api.get('/entries/my-entries')
    return response.data
    
}

async function updateEntry(){
    const response = await api.put('/:entryId/edit')
    return response.data
}

async function deleteEntry() {
    const response = await api.delete('/:entryId')
    return response.data
}


export {
    createNewEntry,
    getAllPublicEntries,
    getAllMyEntries,
    updateEntry,
    deleteEntry
}