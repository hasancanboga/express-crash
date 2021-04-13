const Joi = require('joi')
const express = require('express')

const app = express()
app.use(express.json())

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/courses', (req, res) => {
    res.send(courses)
})

app.get('/courses/:id', (req, res) => {
    course = courses.find(c => c.id == req.params.id)
    if (!course) {
        return res.status(404).send('The course with the given ID was not found')
    }
    res.send(course)
})

app.get('/courses/:year/:month', (req, res) => {
    res.send(req.params) // url params
    res.send(req.query) // query string params (?asd=1)
})

app.post('/courses', (req, res) => {
    // send a post request with { "name": "asa" } to this url in postman. note that url is same as get request, but using post makes it another route.

    const { error } = validateCourse(req.body) // this is called object destructuring. the error const is set to the .error property of whatver validateCourse returns.

    if (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(course)
})

app.put('/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    course = courses.find(c => c.id == req.params.id)
    if (!course) {
        return res.status(404).send('The course with the given ID was not found')
    }

    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body)

    if (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message)
    }

    // Update course
    course.name = req.body.name
    // Return the updated course
    res.send(course)
})

app.delete('/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    course = courses.find(c => c.id == req.params.id)
    if (!course) {
        return res.status(404).send('The course with the given ID was not found')
    }

    // Delete

    const index = courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)
})







function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course)
}






const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
