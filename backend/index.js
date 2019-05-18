// Use local .env file for env vars when not deployed
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

bodyParser = require('body-parser')

// Expose the /upload endpoint
const app = require('express')();
const http = require('http').Server(app);

app.use(bodyParser.json());

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});