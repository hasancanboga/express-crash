const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express();

// ROUTES

app.get('/', (req, res) => {
    res.send('We are on home')
})

app.get('/posts', (req, res) => {
    console.log('Das ist actual route');
    res.send('We are on posts')
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

