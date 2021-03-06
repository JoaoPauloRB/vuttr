require("dotenv-safe").config();
const http = require('http');
const express = require('express'); 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_PATH, {useNewUrlParser: true, useUnifiedTopology: true});
const app = express(); 
 
require('./swaggerConfig')(app);
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/tools'));

const server = http.createServer(app); 
const port = process.env.PORT || 3000;
server.listen(port, process.env.HOST || 'localhost');
console.log(`Servidor escutando na porta ${port}...`)