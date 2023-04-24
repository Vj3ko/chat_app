const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/key', (req, res) => {
  res.json(process.env.REACT_APP_SCALEDRONE_KEY)
})

app.listen(PORT, () => console.log("listening on port", PORT))