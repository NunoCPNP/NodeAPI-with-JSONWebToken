const router = require('express').Router()
const verify = require('../utils/protectedRoutes')

const ProjectsController = require('../controllers/ProjectsController')

// ! GET PROJECTS
router.get('/', ProjectsController.index)
router.post('/add', verify, ProjectsController.store)

module.exports = router
