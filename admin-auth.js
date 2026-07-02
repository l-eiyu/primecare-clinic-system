/* ================================================
   PRIMECARE — admin-auth.js
   Admin authentication guard
   Include on ALL admin pages
   ================================================ */

// Check if logged in AND is admin
function requireAdmin() {
  var user = PrimeCareDB.getCurrentUser();
  if (!user) {
    window.location.href = 'admin-login.html';
    return;
  }
  if (user.role !== 'admin') {
    // Logged in as patient — redirect to patient portal
    window.location.href = 'home.html';
    return;
  }
}

// Load admin user info into topbar
function loadAdminNav() {
  var user = PrimeCareDB.getCurrentUser();
  if (!user) return;

  // Update all admin avatars
  var avatars = document.querySelectorAll('.admin-avatar');
  avatars.forEach(function(el) {
    el.textContent = user.avatar || 'AD';
  });

  // Update admin name
  var nameEls = document.querySelectorAll('.admin-user-info span');
  nameEls.forEach(function(el) {
    el.textContent = user.name || 'Admin';
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  loadAdminNav();
});
