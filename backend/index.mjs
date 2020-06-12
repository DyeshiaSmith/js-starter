import express from 'express'

import validator from 'express-validator'

const { body, validationResult } = validator

const app = express()

app.use(
  express.static('public', {
    // Automatically assume 'html' - allows for '/about'
    extensions: ['html']
  })
)

// Handle POST requests
app.post(
  '*',
  // Express-validator - (https://express-validator.github.io/docs/sanitization.html)
  [
    body(['name', 'fone']).not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      return (
        res
          .status(422)
          // 'json' is part of 'express' - different from the .json() we used with API calls! 😕
          .json({ errors: errors.array() })
      )
    }

    res.end('<p>Info submitted!</p>')
  }
)

// Make sure that this is last
app.use(({ url }, res) => {
  res.status(404).send(`<p>Sorry can't find the page: ${url}!</p>`)
})

app.listen(3000)
