const express = require('express')
const { engine } = require('express-handlebars') 
const app = express()
const port = 3000
let array = []
let baseURL = 'http://localhost:3000/id?url='

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
    res.render('index')
})

app.get('/URLs', (req, res) => {
  // res.render('index')
  let keywords = req.query.url
  console.log(keywords)
  // 檢查input是否為空白
  if (keywords.length > 0) {
      // 檢查input是否已輸入過相同網址 此為尚未輸入過
      if (!array.includes(keywords)) {
        let randomURL = getRandomURL(5)
        console.log(randomURL)
        array.push(keywords,baseURL+randomURL)
        console.log(array)
        res.render('index2',{baseURL,randomURL})
      }
      // 輸入相同網址時，產生一樣的縮址
      else {
        const id_sameURL = array.indexOf(keywords)+1
        baseURL = []
        randomURL = array[id_sameURL]
        res.render('index2',{baseURL,randomURL})
      }
    }
})

app.get('/id',(req,res) => {  
  let newKeywords = req.query.url
  console.log(newKeywords)
  let URL_FindOriginal = array.indexOf(baseURL+newKeywords)-1
  console.log(URL_FindOriginal)
  console.log(array[URL_FindOriginal])
  res.redirect(array[URL_FindOriginal])
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})


