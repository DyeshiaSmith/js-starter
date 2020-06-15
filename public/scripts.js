const form = document.querySelector('form')

const inputs = Array.from(form.querySelectorAll('input[required]'))

function checkInput4Errors (input) {
  // 'pattern' will be 'falsy' if there is no pattern
  const pattern = input.pattern
  const value = input.value.trim()

  return value.length && (!pattern || value.match(new RegExp(pattern)))
}

function renderErrors (errs) {
  return errs.map(({ msg, param }) => `<li class="error">Facing Issue: ${msg} for ${param}</li>`).join(' ')
}

inputs.forEach((input) => {
  input.addEventListener('blur', function () {
    const valid = checkInput4Errors(this)
    input.nextElementSibling.classList.toggle('hidden', valid)
    input.classList.toggle('success', valid)
  })
})

form.addEventListener('submit', async function (e) {
  e.preventDefault()

  if (inputs.find(input => !input.classList.contains('success'))) {
    const res = await window.fetch('', {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body: new FormData(this)
    })

    if (res.status === 422) {
      document.body.innerHTML += `
      <ul>
      ${renderErrors((await res.json()).errors)}
      </ul>
      `
    } else {
      document.body.innerHTML += '<p>Form Submitted</p>'
    }
  }
})
