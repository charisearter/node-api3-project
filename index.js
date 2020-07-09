// code away!
require('dotenv').config();
const server = require('./server.js');



const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server for Node Project 3 on http://localhost:${PORT}`);
});