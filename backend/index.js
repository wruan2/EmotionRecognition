const express = require('express');
const multer = require('multer');
const modify = require('./Modify');
const predict = require('./Predict')
const app = express();
const http = require('http').Server(app);
const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + '.jpg');
    }
  }) 
});

app.use(express.static('./uploads'));

app.post('/upload', upload.single('photo'), (req, res) => {
  const mod = new modify(req.file.path).modify();
  const load = new predict(req.file.path);
  const prediction = load.predict(req.file.buffer);
})

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});