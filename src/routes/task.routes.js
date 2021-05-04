const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    }
    catch{
        res.json({status: 'error'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findById({_id: id})
        res.json(task)
    }
    catch{
        res.json({status: 'error'})
    }
})

router.post('/', async (req, res) => {
    const { title, description } = req.body
    const task = new Task({title, description})

    try {
        await task.save()

        res.json({status: 'task saved'})
    }
    catch{
        res.json({status: 'error'})
    }
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body
    const id = req.params.id
    const body = req.body
    const task = new Task({title, description})

    try {
        await Task.findOneAndUpdate({_id: id}, {$set: body})
        
        res.json({status: 'task updated'})
    }
    catch{
        res.json({status: 'error'})
    }
        
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        await Task.findOneAndDelete({_id: id})
        
        res.json({status: 'task deleted'})
    }
    catch{
        res.json({status: 'error'})
    }
})


module.exports = router