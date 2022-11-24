
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var jsonParser = bodyParser.json()

const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.status(200);
    return res.json('Server is working'); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});