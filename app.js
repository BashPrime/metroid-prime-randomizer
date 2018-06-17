const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
      success: false,
      message: err.message
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
var port = 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`prime-randomizer-web server running on localhost:${port}`));
