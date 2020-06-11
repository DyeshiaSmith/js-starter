import { promises as fs } from 'fs'

import express from 'express'

import validator from 'express-validator'

const { body, validationResult } = validator

const app = express()

app.get('*', async ({ url }, res, next) => {
  if (!url.slice(1)) {
    url = '/index.html'
  }

  const HTMLFile = url.includes('.') ? url : `${url}.html`

  try {
    res.end(await fs.readFile(HTMLFile.slice(1), 'utf-8'))
  } catch (err) {
    next(err)
  }
})

app.post(
  '*',
  [
    body('email').isEmail().normalizeEmail(),
    body(['name', 'fone']).not().isEmpty().trim().escape()
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    res.end('<p>Info Submitted!</p>')
  }
)

app.listen(5000)
