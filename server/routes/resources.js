var express = require('express');
var router = express.Router();
module.exports = router;

const AutoKey = require('./autoKeys');
const Resource = require('../models/resource');


router.get('/', (req, res, next) => {

    Resource.find()
        .populate('tags')
        .then(foundResources => {
            return res.status(200).json(foundResources);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });

});

router.post('/', (req, res, next) => {
    const maxResourceId = AutoKey.nextId("resources");
    console.log(maxResourceId);
    const resource = new Resource({
        id: maxResourceId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        tags: req.body.tags
    });

    resource.save()
        .then(createdResource => {
            res.status(201).json({
                message: 'Resource added successfully',
                resource: createdResource
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});


router.put('/:id', (req, res, next) => {
    Resource.findOne({ id: req.params.id })
        .then(resource => {
            resource.name = req.body.name;
            resource.description = req.body.description;
            resource.url = req.body.url;
            resource.tags = req.body.tags;

            Resource.updateOne({ id: req.params.id }, resource)
                .then(result => {
                    res.status(204).json({
                        message: 'Resource updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Resource not found.',
                error: { resource: 'Resource not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Resource.findOne({ id: req.params.id })
        .then(resource => {
            Resource.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Resource deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Resource not found.',
                error: { resource: 'Resource not found' }
            });
        });
});