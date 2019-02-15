const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});
router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({message: 'project not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});

// POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST 
router.post('/', async (req, res) => {
    if (!req.body.name || req.body.name === '' || !req.body.description) {
        res.status(400).json({message:'Please provide valid text and user id'})
    }
    try {
        const project = await Projects.insert({name: req.body.name, description: req.body.description});
        res.status(201).json(project);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the post!'});
    }
});

// DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The project has been deleted'});
        } else {
            res.status(404).json({message: 'The project could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the project.'});
    }
});

// PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // 
router.put('/:id', async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
        if(project) {
            res.status(200).json(project);
        }else {
            res.status(404).json({message: 'project could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the project.'});
    }
})

// Get an actionf or a project // Get an actionf or a project // Get an actionf or a project // Get an actionf or a project // Get an actionf or a project 
router.get('/:id/actions', async (req, res) => {
   
    try {
        const project = await Projects.getProjectActions(req.params.id);
        if(project) {
            res.status(200).json(project);
        }else {
            res.status(404).json({message: 'project not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error finding the project.'});
    }

})

module.exports = router;