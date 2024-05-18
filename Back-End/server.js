const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const path = require('path')
const app = express()
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234567890',
  port: 5432,
})

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

app.post('/submit', async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)'
  const values = [username, email, hashedPassword]

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack)
      return res.status(500).json({ success: false, message: 'Database error' })
    }
    res.json({ success: true, userData: { username, email, password } })
  })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
