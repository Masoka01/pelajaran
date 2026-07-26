import { login, getSession } from './auth.js'

const form = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')
const loginError = document.getElementById('loginError')

getSession().then(session => {
  if (session) window.location.href = '/admin/'
})

form.addEventListener('submit', async e => {
  e.preventDefault()
  loginError.classList.remove('visible')
  loginError.textContent = ''

  const email = emailInput.value.trim()
  const password = passwordInput.value

  if (!email || !password) {
    loginError.textContent = 'Email dan password harus diisi.'
    loginError.classList.add('visible')
    return
  }

  loginBtn.disabled = true
  loginBtn.innerHTML = '<span class="spinner"></span>'

  try {
    await login(email, password)
    window.location.href = '/admin/'
  } catch (err) {
    const msg =
      err.message === 'Invalid login credentials'
        ? 'Email atau password salah.'
        : err.message || 'Terjadi kesalahan. Coba lagi.'
    loginError.textContent = msg
    loginError.classList.add('visible')
    loginBtn.disabled = false
    loginBtn.textContent = 'Masuk'
  }
})
