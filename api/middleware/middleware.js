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
        res.status(404).json({ message: `Action with id ${req.params.id} not found.` })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error getting action by id.' })
    }
}

function validateAction(req, res, next) {
    console.log('checking action request body')
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "project_id, description, and notes are required fields" })
    } else {
        next()
    }
}

module.exports = { validateActionId, validateAction }
