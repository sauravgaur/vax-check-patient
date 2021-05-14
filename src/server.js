const express = require('express');
// const cors = require('cors');
const bodyParser= require('body-parser');

const app = express()

app.use(bodyParser.json());
// app.use(cors({ origin: true }));
// X-XSS-Protection header

app.use(express.static(path.join(process.cwd(),'dist')));

app.get('/', function (req, res) {
  // res.send('Hello World')
  res.sendFile(path.join(process.cwd(),'dist','index.html'))
})


 
app.listen(3001)