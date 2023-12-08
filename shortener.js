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
  let keywords = req.query.originalURL
  console.log(keywords)
  let randomURL = getRandomURL(5)
  console.log(randomURL)
  array.push(keywords,baseURL+randomURL)
  console.log(array)
  res.render('index',{baseURL,randomURL})
})

app.get('/Allen',(req,res) => {
  let newKeywords = req.query.originalURL
  console.log(newKeywords)
  let URL_FindOriginal = array.indexOf(baseURL+newKeywords)-1
  console.log(URL_FindOriginal)
  console.log(array[URL_FindOriginal])
  res.redirect(array[URL_FindOriginal])
})

// let obj = {table: []};
// obj.table.push({id: 123, square:2342})
// let json = JSON.stringify(obj);
// let fs = require('fs');
//     fs.writeFile("storage.json", json, 'utf8', function (err) {
//     if (err) {
//         console.log("URL failed to save.");
//         return console.log(err);
//     }
//     console.log("URL was successfully saved!");
// });
app.get('/URL/:id', (req, res) => {
  const id = req.params.id
  res.send(`read URL: ${id}`)
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})


