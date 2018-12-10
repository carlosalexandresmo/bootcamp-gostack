const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

// Middlewares
const verificaIdade = (req, res, next) => {
  let { age } = req.query
  age !== undefined ? next() : res.redirect('/')
}

// Rotas
app.get('/', (req, res) => res.render('home'))

app.post('/check', (req, res) => {
  let age = req.body.age
  let redirect = age >= 18 ? '/major' : '/minor'
  return res.redirect(`${redirect}?age=${age}`)
})

app.get('/major', verificaIdade, (req, res) => {
  let age = req.query.age
  res.render('major', { age })
})

app.get('/minor', (req, res) => {
  let age = req.query.age
  res.render('minor', { age })
})

app.listen(3002)
