import { getSession, logout, onAuthStateChange } from './auth.js'

const app = document.getElementById('app')

async function init() {
  const session = await getSession()

  if (!session) {
    window.location.href = '/login.html'
    return
  }

  renderDashboard(session.user.email)
}

function renderDashboard(email) {
  app.innerHTML = `
    <div class="admin-page">
      <nav class="admin-nav">
        <div class="brand">Cilok <span class="text-primary">Pak Mayoni</span></div>
        <div class="admin-nav-actions">
          <span class="admin-email">${email}</span>
          <button class="btn btn-ghost btn-small" id="logoutBtn">Keluar</button>
        </div>
      </nav>
      <main class="admin-main">
        <div class="admin-header">
          <h2>Dashboard Admin</h2>
          <p class="text-body text-muted" style="margin-top: var(--space-1);">Kelola menu dan lihat pesanan masuk.</p>
        </div>
        <div class="admin-grid">
          <div class="stat-card">
            <div class="stat-label">Total Menu</div>
            <div class="stat-value">4</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Pesanan Hari Ini</div>
            <div class="stat-value">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Pendapatan</div>
            <div class="stat-value">Rp0</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Pelanggan</div>
            <div class="stat-value">0</div>
          </div>
        </div>
        <div class="admin-placeholder">
          <h3 class="text-h3">Fitur Coming Soon</h3>
          <p class="text-body text-muted">
            Halaman ini akan dikembangkan untuk mengelola menu, melihat pesanan masuk,
            dan mengatur promo. Pantau terus!
          </p>
        </div>
      </main>
    </div>
  `

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout()
    window.location.href = '/login.html'
  })
}

onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = '/login.html'
  }
})

init()
