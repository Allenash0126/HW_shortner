const express = require('express')
const { engine } = require('express-handlebars') 
const app = express()
const port = 3000
const baseURL = 'http://localhost:3000/id?url='
const ncp = require("copy-paste"); 
const fs = require('fs');

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

// 產出用於短址的5碼亂數
function getRandomURL(quantityOfUnit) {
  let component = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  let URL = ''
  for (i = 0; i < quantityOfUnit; i++) {
    let character = component[Math.floor(component.length*Math.random())]
    URL += character
  }
  return(URL)
}

// 當user提供縮址(value)，希望反查原址(key)的時候
function getKeyByValue(obj,value) {
  return Object.keys(obj).find(key => obj[key] === value)
}

// 首頁
app.get('/',(req,res) => {
    res.render('index');
})

// 產出短址 by JSON
app.get('/URLs', (req, res) => {
  let URL_original = req.query.url

  // 檢查input是否為空白
  if (URL_original.length > 0) {
    // save for copy button
    fs.readFile('./saveForCopy.json',(err, data) => {
      if (err) throw err
      let obj = JSON.parse(data)
      obj["URL_Temp"] = URL_original  
      let json = JSON.stringify(obj)
      fs.writeFile('./saveForCopy.json',json,(err) => {
        if (err) throw err;
    })  
  })
        // 讀取已含有值的JSON檔，並加入新的網址存到JSON檔裡
        fs.readFile('./storage.json',(err, data) => {
          if (err) throw err
          let obj = JSON.parse(data)

          // 檢查input是否已輸入過相同網址 此為「尚未」輸入過
          if (!obj.hasOwnProperty(URL_original)) {
            let randomURL = getRandomURL(5)
            obj[URL_original] = baseURL+randomURL;
            let json = JSON.stringify(obj)
            fs.writeFile('./storage.json',json,(err) => {
              if (err) throw err;
              console.log('Data written to file');
            })
            res.render('index2',{baseURL,randomURL})
          }

          // 檢查input是否已輸入過相同網址 此為「已」輸入過，故提供相同網址
          if (obj.hasOwnProperty(URL_original)) {
            let baseURL = obj[URL_original]
            let randomURL = ''
            res.render('index2',{baseURL,randomURL})
          }
        })
    }
})


// 當user貼上短址後，重新導向原本的網址
app.get('/id', (req,res) => {
  
  let URL_shortened = req.query.url
  fs.readFile('./storage.json',(err,data) => {
    if (err) throw err;
    let obj = JSON.parse(data)
    res.redirect(getKeyByValue(obj,baseURL+URL_shortened))
  })
})

// Copy Button
app.get('/buttonClicked',(req,res) => {
  fs.readFile('./saveForCopy.json', (err,data) => {
    if (err) throw err;
    let obj = JSON.parse(data)
    let value = obj["URL_Temp"]

    fs.readFile('./storage.json',(err,URL) => {
      if (err) throw err;
      let records = JSON.parse(URL)
      let copyURL = records[value]

      // 導入ncp，作為複製至剪貼簿的外掛
      ncp.copy(copyURL, function () {})
    })
  })
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})