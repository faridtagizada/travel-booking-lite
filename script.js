const loginModal = document.getElementById('loginModal');
const openLogin = document.getElementById('openLogin');
const heroLogin = document.getElementById('heroLogin');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const userLabel = document.getElementById('userLabel');
const userStatus = document.getElementById('userStatus');
const dashboardPanel = document.getElementById('dashboardPanel');
const dashboardStatus = document.getElementById('dashboardStatus');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const savedCount = document.getElementById('savedCount');

let savedItems = Number(localStorage.getItem('savedItems') || 0);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function openModal() {
  loginModal.classList.add('show');
  loginModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  loginModal.classList.remove('show');
  loginModal.setAttribute('aria-hidden', 'true');
}

function getUser() {
  return localStorage.getItem('demoUser');
}

function updateAuthUI() {
  const user = getUser();
  savedCount.textContent = savedItems;
  if (user) {
    userLabel.textContent = user;
    userStatus.textContent = 'Logged in with fake JavaScript auth.';
    dashboardPanel.classList.remove('locked');
    dashboardPanel.classList.add('unlocked');
    dashboardStatus.textContent = 'Unlocked';
    dashboardStatus.classList.add('ok');
    logoutBtn.classList.remove('hidden');
    openLogin.classList.add('hidden');
  } else {
    userLabel.textContent = 'Guest';
    userStatus.textContent = 'Login to unlock the fake dashboard section.';
    dashboardPanel.classList.add('locked');
    dashboardPanel.classList.remove('unlocked');
    dashboardStatus.textContent = 'Locked';
    dashboardStatus.classList.remove('ok');
    logoutBtn.classList.add('hidden');
    openLogin.classList.remove('hidden');
  }
}

openLogin.addEventListener('click', openModal);
heroLogin.addEventListener('click', openModal);

loginModal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'modal') {
    closeModal();
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!username) {
    showToast('Type a username first.');
    return;
  }
  if (password !== '1234') {
    showToast('Password is 1234 for this demo.');
    return;
  }
  localStorage.setItem('demoUser', username);
  closeModal();
  updateAuthUI();
  showToast(`Welcome, ${username}!`);
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('demoUser');
  updateAuthUI();
  showToast('Logged out.');
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll('.item-card').forEach((card) => {
    const name = card.dataset.name;
    card.style.display = name.includes(value) ? '' : 'none';
  });
});

document.querySelectorAll('.choose-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (!getUser()) {
      showToast('Login first to save choices.');
      openModal();
      return;
    }
    savedItems += 1;
    localStorage.setItem('savedItems', savedItems);
    updateAuthUI();
    showToast(`Saved ${button.dataset.choice}.`);
  });
});

document.querySelectorAll('.plan-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showToast('Plan selected for demo only.');
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  if (!name || !email || !message) {
    showToast('Please fill all fields.');
    return;
  }
  contactForm.reset();
  showToast('Fake message sent.');
});

updateAuthUI();
