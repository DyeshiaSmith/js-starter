const form = document.querySelector('form')

const inputs = Array.from(form.querySelectorAll('input[required]'))

function checkInput4Errors (input) {
  // 'pattern' will be 'falsy' if there is no pattern
  const pattern = input.pattern
  const value = input.value.trim()

  return !value.length === 0 || (pattern && !value.match(new RegExp(pattern)))
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
})

inputs.forEach((input) => {
  input.addEventListener('blur', function () {
    console.log(checkInput4Errors(this))
  })
})
