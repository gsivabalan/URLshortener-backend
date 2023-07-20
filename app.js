const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { redirectUrl } = require('./controllers/url');
const dotenv = require('dotenv');
const connectDB = require('./database');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build')
    );
});

app.get('/login', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build')
    );
});

app.get('/register', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build')
    );
});

app.get('/error', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build')
    );
});

app.get('/logout', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build')
    );
});

app.use('/api', routes);

app.get('/:urlSlug', redirectUrl);

const port = process.env.PORT || 9090;
const address = `http://localhost:${port}`;

connectDB().then(() => {
    app.listen(port, function () {
        if (process.env.NODE_ENV !== 'production')
            console.log(`starting app on: ${address}`);
    });
});
