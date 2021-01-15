const Actions = require('../actions/actions-model.js')
const Projects = require('../projects/projects-model.js')

async function validateActionId(req, res, next) {
    console.log('checking action id')
    try {
      const action = await Actions.get(req.params.id)
      if (action) {
        req.action = action
        next()
      } else {
        res.status(404).json({ message: `Action with id ${req.params.id} not found` })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error getting action by id' })
    }
}

function validateAction(req, res, next) {
    console.log('checking action request body')
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'project_id, description, and notes are required action fields' })
    } else {
        next()
    }
}

async function validateProjectId(req, res, next) {
    console.log('checking project id')
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            req.project = project
            next()
        } else {
            res.status(404).json({ message: `Project with id ${req.params.id} not found`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting project by id' })
    }
}

function validateProject(req, res, next) {
    console.log('checking project request body')
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'name and description are required project fields' })
    } else {
        next()
    }
}

// new branch for submission
async function validateActionProjectId(req, res, next) {
    console.log('checking project id')
    try {
        const project = await Projects.get(req.body.project_id)
        if (project) {
            next()
        } else {
            res.status(404).json({ message: `Actions's project_id, ${req.body.project_id}, not found in projects`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding project associated with action' })
    }
}

module.exports = { validateActionId, validateAction, validateProjectId, validateProject, validateActionProjectId }
