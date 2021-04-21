const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// get all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)

    } catch (error) {
        res.json({ message: err })
    }
})

// submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (error) {
        res.json({ message: error })
    }

})

// get a specific post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (error) {
        res.json({ message: error })
    }
})

// delete a specific post
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.id })
        res.json(removedPost)
    } catch (error) {
        res.json({ message: error })
    }
})

// delete a specific post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        )
        res.json(updatedPost)
    } catch (error) {
        res.json({ message: error })
    }
})


module.exports = router