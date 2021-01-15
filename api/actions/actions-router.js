const express = require('express')
const Actions = require('./actions-model')

const { validateActionId, validateAction, validateActionProjectId } = require('../middleware/middleware.js')

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error getting all actions'
            })
        })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateAction, validateActionProjectId, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error posting new action'
            })
        })
})

router.put('/:id', validateActionId, validateAction, validateActionProjectId, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Action update failed'
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error deleting action'
            })
        })
})

module.exports = router