const urlInput = document.querySelector('#url-input')
const urlForm = document.querySelector('#url-form')

urlForm.addEventListener('submit', function onURLSubmitted(event) {
  const urlOriginal = urlInput.value
  event.preventDefault()
  console.log(urlOriginal)
})
