const Project = require('../model/Projects')

// TODO store, update, destroy

module.exports = {
  async index (request, response) {
    const projects = await Project.find()

    return response.json(projects)
  },

  async store (request, response) {
    const project = new Project({
      title: request.body.title,
      cover: request.body.cover,
      description: request.body.description,
      githuburl: request.body.githuburl,
      projecturl: request.body.projecturl
    })

    try {
      const savedProject = await project.save()
      response.send(savedProject)
    } catch (error) {
      response.status(400).send(error)
    }
  }
}
