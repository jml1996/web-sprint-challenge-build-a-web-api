const express = require('express')
const Projects = require('./projects-model')

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

module.exports = router