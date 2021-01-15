const express = require('express')
const Projects = require('./projects-model')

const { validateProjectId, validateProject } = require('../middleware/middleware.js')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error getting all projects'
            })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    // Are actions considered part of projects here?
    // If so, why here and not in get('/')?
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error posting new project'
            })
        })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Project update failed'
        })
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error deleting project'
            })
        })
})

module.exports = router