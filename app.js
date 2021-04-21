require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const postsRoute = require('./routes/posts')
const cors = require('cors')
const app = express();

// Middlewares
app.use(cors())
app.use(express.json())


// import routes
app.use('/posts', postsRoute)

app.get('/', (req, res) => {
    res.send('HOME GET')
})


// Connecto to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to DB!')
    }
})


// start listening the server
app.listen(3000);


