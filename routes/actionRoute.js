const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the action!'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({message: 'action not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the action!'});
    }
});

// POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST 
router.post('/',  async (req, res) => {
    if (!req.body.description || !req.body.description === '') {
        res.status(400).json({message:'Please provide valid name'})
    }
    try {
        const action = await Actions.insert({description: req.body.description, notes: req.body.notes, project_id: req.body.project_id});
        res.status(201).json(action);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the action!'});
    }
});

// function uppercaseCheck (name) {
//     return function (req, res, next) {
//         if (!req.body.name) {
//             res.status(422).json({ message: "name required" });
//           } else {
//             req.body.name = req.body.name.toUpperCase();
//             next();
//           }
//     }
// }

// DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The user has been deleted'});
        } else {
            res.status(404).json({message: 'The user could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the user.'});
    }
});

// PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // 
router.put('/:id', async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body);
        if(action) {
            res.status(200).json(action);
        }else {
            res.status(404).json({message: 'could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the action.'});
    }
})



module.exports = router;