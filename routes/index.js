const express = require('express');
const { createUrl, getUrls, checkSlug } = require('../controllers/url');
const { register, login } = require('../controllers/user');
const { checkToken } = require('../middlewares/verifyUser');
// const { redirectUrl } = require('../controllers/url');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/register', register);
router.post('/login', login);
router.post('/shorten', checkToken, createUrl);
router.get('/urls/:id', checkToken, getUrls);
router.get('/check/:urlSlug', checkSlug);

// router.get('/:urlSlug', redirectUrl);

module.exports = router;
