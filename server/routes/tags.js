var express = require('express');
var router = express.Router();
module.exports = router;

const AutoKey = require('./autoKeys');
const Tag = require('../models/tag');


router.get('/', (req, res, next) => {

    Tag.find()
        .then(foundTags => {
            return res.status(200).json(foundTags);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });

});

router.post('/', (req, res, next) => {
    const maxTagId = AutoKey.nextId("tags");

    const tag = new Tag({
        id: maxTagId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    tag.save()
        .then(createdTag => {
            res.status(201).json({
                message: 'Tag added successfully',
                tag: createdTag
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});


router.put('/:id', (req, res, next) => {
    Tag.findOne({ id: req.params.id })
        .then(tag => {
            tag.name = req.body.name;
            tag.description = req.body.description;
            tag.url = req.body.url;

            Tag.updateOne({ id: req.params.id }, tag)
                .then(result => {
                    res.status(204).json({
                        message: 'Tag updated successfully'
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
                message: 'Tag not found.',
                error: { tag: 'Tag not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Tag.findOne({ id: req.params.id })
        .then(tag => {
            Tag.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Tag deleted successfully"
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
                message: 'Tag not found.',
                error: { tag: 'Tag not found' }
            });
        });
});