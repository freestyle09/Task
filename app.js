const express = require('express');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = 5000 | process.env.PORT;
app.listen(PORT, () => console.log(`Listening on ${PORT} port...`));
