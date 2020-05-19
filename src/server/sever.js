var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//  configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cors
app.use(cors());

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Endpoints
app.get('/', function (req, res) {
    res.sendFile(path.resolve('/dist/index.html'));
});
