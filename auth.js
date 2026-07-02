/* ================================================
   PRIMECARE — auth.js
   Authentication guard + session management
   Include this on ALL protected pages
   ================================================ */

// Redirect to login if not logged in
// Also redirect admin users to admin dashboard
function requireLogin() {
  var user = PrimeCareDB.getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  if (user.role === 'admin') {
    window.location.href = 'admin-dashboard.html';
    return;
  }
}

// Redirect to home if already logged in as patient
// Redirect to admin dashboard if logged in as admin
function requireGuest() {
  var user = PrimeCareDB.getCurrentUser();
  if (!user) return;
  if (user.role === 'admin') {
    window.location.href = 'admin-dashboard.html';
  } else {
    window.location.href = 'home.html';
  }
}

// Load current user info into navbar
function loadUserNav() {
  var user = PrimeCareDB.getCurrentUser();
  if (!user) return;

  // Update all avatar placeholders with user initial
  var avatars = document.querySelectorAll('.avatar-placeholder');
  avatars.forEach(function(el) {
    el.textContent = user.avatar || user.name.charAt(0).toUpperCase();
  });

  // Update notification badge with unread count
  var count = PrimeCareDB.getUnreadCount();
  var badges = document.querySelectorAll('.notif-badge');
  badges.forEach(function(badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  loadUserNav();
});
