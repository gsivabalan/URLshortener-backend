const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { redirectUrl } = require('./controllers/url');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
});

app.get('/login', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.get('/register', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.get('/error', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});
app.get('/logout', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.use('/api', routes);

app.get('/:urlSlug', redirectUrl);

module.exports = app;
