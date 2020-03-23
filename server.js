const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static('static'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 5007;

app.listen(port, () => console.log(`Server started on port ${port}`));