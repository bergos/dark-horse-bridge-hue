const express = require('express')
const morgan = require('morgan')
const url = require('url')
const middleware = require('./middleware')

const app = express()

app.use(morgan('combined'))

Promise.resolve().then(() => {
  app.use(middleware(process.env.HUE_HOST, process.env.HUE_USER, process.env.BASE_URL))

  return new Promise((resolve, reject) => {
    const server = app.listen(url.parse(process.env.BASE_URL).port, (err) => {
      if (err) {
        return reject(err)
      }

      const address = server.address().address
      const port = server.address().port

      console.log(`listening at: http://${address}:${port}`)

      resolve()
    })
  })
}).catch((err) => {
  console.error(err)
})
