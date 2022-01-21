const express = require('express')
var cors = require('cors')
const app = express();
const port = 80;
const host = 'azure';

const routing = require('./api/routing');
var corsOptions = {
   origin: 'http://localhost:3001',
   optionsSuccessStatus: 200 ,// For legacy browser support
   methods: "GET, PUT"
}

app.use(cors(corsOptions));
routing(app);

app.listen(port, function() {
   console.log('Server started: ' + host + ':' + port);
});