const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken')
const Entry = require('../models/Entry')

router.post('/', verifyToken, async (req,res)=>{
    try{
        const {title, entryBody, isPublic} = req.body
        const newEntry = await Entry.create({
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
            owner: req.user._id
        })
        res.status(201).json(newEntry)
    }catch(err){
        console.log(err)
    }
})

router.get('/', verifyToken, async (req,res)=>{
    try{
        const publicEntries = await Entry.find({isPublic: true}).populate('owner')
        res.status(201).json(publicEntries)
    }catch(err){
        console.log(err)
    }
})

router.get('/my-entries', verifyToken, async (req,res)=>{
    try{
        const myEntries = await Entry.find({owner:req.user._id}).populate('owner')
        res.status(200).json(myEntries)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:entryId', verifyToken, async (req,res)=>{
    try{
    const foundEntry = await Entry.findById(req.params.entryId)
    console.log(foundEntry)

    if(!foundEntry){
    return res.status(404).json({message: 'Entry not found'})

    }
    if(foundEntry.owner == req.user._id){
    const deleteEntry = await Entry.findByIdAndDelete(req.params.entryId)

    res.status(204).json(deleteEntry)
    }
    else{
        return res.status(403).json({message: 'You cannot delete this Entry'})
    }

    }catch(err){
        console.log(err)
    }
})

router.get('/:entryId/edit', verifyToken, async (req,res)=>{
    const foundEntry = await Entry.findById(req.params.entryId).populate('owner')
    res.json({Entry: foundEntry})
})

router.put('/:entryId/edit', verifyToken,async (req,res)=>{
    req.body.isPublic = Boolean(req.body.isPublic)
    try{
    const foundEntry = await Entry.findById(req.params.entryId)

    if(foundEntry.owner == req.user._id){
    const updateEntry = await Entry.findByIdAndUpdate(req.params.entryId, 
            {title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: req.body.isPublic
            }, {new: true})
    res.json(updateEntry)
    }
    else{
        return res.status(403).json({message: 'You cannot update this Entry'})
    }

    }catch(err){
        console.log(err)
    }
})
module.exports = router;
