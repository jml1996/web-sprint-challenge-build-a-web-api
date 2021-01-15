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
    // ******
    // From spec: "[GET] /api/projects/:id sends a project with the given id as the body of the response."
    // Are actions considered part of a "project," here?
    // If so, why are they considered part of projects here, and not in get('/')?
    // This has to do with the preexisting code in projects-model.js; it just seems
    // odd that projects-model.js functions that way.
    // ******
    res.status(200).json(req.project)
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    res.status(200).json(req.project.actions)
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