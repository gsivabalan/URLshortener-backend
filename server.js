const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./database');

dotenv.config();

const port = process.env.PORT || 9090;
const address = `http://localhost:${port}`;

connectDB().then(() => {
    app.listen(port, function () {
        if (process.env.NODE_ENV !== 'production')
            console.log(`starting app on: ${address}`);
    });
});
