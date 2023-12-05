// const urlInput = document.querySelector('#url-input')
// const urlForm = document.querySelector('#url-form')
const express = require('express')
const app = express()
const port = 3001

app.get('/',(req,res) => {
  res.send('express app for shorten-URL')
})

app.listen(port,() => {
  console.log(`express server is running on http://localhost:${port}`)
})


// urlForm.addEventListener('submit', function onURLSubmitted(event) {
//   const urlOriginal = urlInput.value
//   event.preventDefault()
//   console.log(urlOriginal)
// })
