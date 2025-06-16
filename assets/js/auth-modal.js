// auth-modal.js
console.log('auth-modal.js loaded');
(function() {
  const signinTab = document.getElementById('signin-tab');
  const signupTab = document.getElementById('signup-tab');
  const signinPane = document.getElementById('signin');
  const signupPane = document.getElementById('signup');
  if (signinTab && signupTab && signinPane && signupPane) {
    signinTab.addEventListener('click', function() {
      signinTab.classList.add('active');
      signupTab.classList.remove('active');
      signinPane.classList.add('show', 'active');
      signupPane.classList.remove('show', 'active');
    });
    signupTab.addEventListener('click', function() {
      signupTab.classList.add('active');
      signinTab.classList.remove('active');
      signupPane.classList.add('show', 'active');
      signinPane.classList.remove('show', 'active');
    });
  }
  // Sign Up logic
  var signupForm = document.getElementById('signupForm');
  if(signupForm) {
    signupForm.onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const username = document.getElementById('signupUsername').value;
      const password = document.getElementById('signupPassword').value;
      const role = document.getElementById('signupRole').value;
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ name, username, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign Up berhasil! Silakan Sign In.');
      if(signinTab) signinTab.click();
    };
  }
  // Sign In logic
  var signinForm = document.getElementById('signinForm');
  if(signinForm) {
    signinForm.onsubmit = function(e) {
      e.preventDefault();
      const username = document.getElementById('signinUsername').value;
      const password = document.getElementById('signinPassword').value;
      // Super user check
      if(username === 'superadmin' && password === 'superadmin') {
        localStorage.setItem('superUserLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
        return;
      }
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === username && u.password === password);
      if(user) {
        // Sinkronisasi profil sesuai role
        if(user.role === 'siswa') {
          localStorage.setItem('profileSiswa', JSON.stringify({
            name: user.name,
            desc: user.desc || 'Deskripsi singkat siswa.',
            photo: user.photo || 'assets/img/user-default.png',
            username: user.username
          }));
          window.location.href = 'dashboard-siswa.html';
        } else if(user.role === 'guru') {
          localStorage.setItem('profileGuru', JSON.stringify({
            name: user.name,
            desc: user.desc || 'Deskripsi singkat guru.',
            photo: user.photo || 'assets/img/user-default.png',
            username: user.username
          }));
          window.location.href = 'dashboard-guru.html';
        } else {
          alert('Akses dashboard hanya untuk role siswa atau guru.');
        }
      } else {
        // Notifikasi detail error login
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const userByUsername = users.find(u => u.username === username);
        if(!userByUsername) {
          alert('Username tidak ditemukan!');
        } else {
          alert('Password salah!');
        }
      }
    };
  }
})();
