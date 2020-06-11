import express from 'express'

const app = express()

app.get('*', (_, res) => {
  res.send('<h1>Hello Express</h1>')
})

app.listen(5000)
