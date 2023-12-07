const express = require('express')
const { engine } = require('express-handlebars') 
const app = express()
const port = 3001

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

function getRandomURL(quantityOfUnit) {
  let component = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  let URL = ''
  for (i = 0; i < quantityOfUnit; i++) {
    let character = component[Math.floor(component.length*Math.random())]
    URL += character
  }
  return(URL)
}

app.get('/',(req,res) => {
    res.redirect('/URLs')
})

app.get('/URLs', (req, res) => {
  let keywords = req.query.originalURL
  console.log(keywords)
  res.render('index')
})

app.get('/URL/:id', (req, res) => {
  const id = req.params.id
  res.send(`read URL: ${id}`)
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})


