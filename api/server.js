const express = require('express');

const ActionsRouter = require('./actions/actions-router.js')
const ProjectsRouter = require('./projects/projects-router.js')

const server = express();

server.use(express.json())

server.use('/api/actions', ActionsRouter)
server.use('/api/projects', ProjectsRouter)

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.get('/', (req, res) => {
    res.send(`<h2>For data, navigate to either of these two endpoints: (1) [url]/api/projects, and (2) [url]/api/actions.</h2>`)
})

module.exports = server;
