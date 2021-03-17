const PORT = 3000;

require("dotenv-safe").config();
const http = require('http');
const express = require('express'); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vuttr', {useNewUrlParser: true, useUnifiedTopology: true});

const auth = require('./routes/auth');
const app = express(); 
 
app.use(express.json());
app.use(auth);

const server = http.createServer(app); 
server.listen(PORT);
console.log("Servidor escutando na porta 3000...")