const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { auth } = require('express-openid-connect');

const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
};

// import routing
const index = require('./server/routes/app');
const resourceRoutes = require('./server/routes/resources')
const tagRoutes = require('./server/routes/tags')
const authRoutes = require('./server/routes/auth')

// connect to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/rsc',
    { useNewUrlParser: true }, (err, res) => {
        if (err) {
            console.log('Failed to connect: ' + err);
        }
        else {
            console.log('Connected to DB');
        }
    }
);

const app = express();

app.use(auth(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));
// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// static page
app.use(express.static(path.join(__dirname, 'dist/wdd430-final')));
// defined routes
app.use('/', index);
app.use('/resources', resourceRoutes)
app.use('/tags', tagRoutes)
app.use('/auth', authRoutes)

// catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/rsc/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

// create server
const server = http.createServer(app);
// start listening
server.listen(port, function () {
    console.log('API running on localhost: ' + port)
});
