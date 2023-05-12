const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5050
const cors = require('cors')
require('dotenv').config()

// database
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  }
)

// app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// ROutes
app.get('/', async (request, response) => {
  const todoItems = await db.collection('todos').find().toArray()
  const itemsLeft = await db
    .collection('todos')
    .countDocuments({ completed: false })
  response.json({ items: todoItems, left: itemsLeft })
})
app.post('/addTodo', async (request, response) => {
  try {
    const items = await db.collection('todos').insertOne({
      thing: request.body.todoItem,
      completed: false,
    })
    console.log('Todo Added')
    response.json(items)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'An error occurred' })
  }
})
app.delete('/deleteItem', async (request, response) => {
  try {
    const item = await db
      .collection('todos')
      .deleteOne({ thing: request.body.todoItem })
    console.log('Item Deleted')
    response.json(item)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'An error occurred' })
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
