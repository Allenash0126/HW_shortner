const express = require('express')
const { engine } = require('express-handlebars') 
const app = express()
const port = 3001
let array = []
const baseURL = 'http://localhost:3001/Allen?originalURL='

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
  res.render('index')
  let keywords = req.query.originalURL
  console.log(keywords)
  array.push(keywords,baseURL+getRandomURL(5))
  console.log(array)
  
})

app.get('/Allen',(req,res) => {
  let newKeywords = req.query.originalURL
  console.log(newKeywords)
  let URL_FindOriginal = array.indexOf(baseURL+newKeywords)-1
  console.log(URL_FindOriginal)
  console.log(array[URL_FindOriginal])
  res.redirect(array[URL_FindOriginal])
})

app.get('/URL/:id', (req, res) => {
  const id = req.params.id
  res.send(`read URL: ${id}`)
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})


