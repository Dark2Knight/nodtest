const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, this is a simple Node.js app!');
});


app.use('/public', express.static('public'));

app.get('/save', (req, res) => {
  const requestData = JSON.stringify(req.query);

  fs.appendFile('./public/req.txt', requestData + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Error appending data to file:', err);
      res.status(500).send('Error saving the request.');
    } else {
      console.log('Request data saved to file:', requestData);
      res.send('Request data saved successfully.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
